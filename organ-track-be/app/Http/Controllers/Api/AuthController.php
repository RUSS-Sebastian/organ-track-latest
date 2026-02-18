<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'gender' => 'required|in:male,female',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'gender' => $validated['gender'],
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }


    /*public function register(Request $request)
    {
        try {
            // Handle common field name mistakes (name_ instead of name, etc.)
            if ($request->has('name_') && !$request->has('name')) {
                $request->merge(['name' => $request->input('name_')]);
            }
            if ($request->has('email_') && !$request->has('email')) {
                $request->merge(['email' => $request->input('email_')]);
            }
            if ($request->has('password_') && !$request->has('password')) {
                $request->merge(['password' => $request->input('password_')]);
            }

            // Validate the request - Laravel handles both JSON and form-data automatically
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6',
                'gender' => 'required|in:male,female,other',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            ]);

            $userData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'gender' => $validated['gender'],
            ];

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('profiles', 'public');
                $userData['image'] = $imagePath;
            }

            $user = User::create($userData);

            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            $receivedData = $request->all();
            $fieldNameIssues = [];
            
            // Check for common field name mistakes
            if (isset($receivedData['name_']) && !isset($receivedData['name'])) {
                $fieldNameIssues[] = 'Found "name_" but expected "name" - remove the underscore!';
            }
            if (isset($receivedData['email_']) && !isset($receivedData['email'])) {
                $fieldNameIssues[] = 'Found "email_" but expected "email" - remove the underscore!';
            }
            if (isset($receivedData['password_']) && !isset($receivedData['password'])) {
                $fieldNameIssues[] = 'Found "password_" but expected "password" - remove the underscore!';
            }
            
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $e->errors(),
                'hint' => 'POSTMAN TIP: Use "form-data" (not raw JSON) when sending files. Field names must be exactly: name, email, password, image (file type).',
                'field_name_issues' => !empty($fieldNameIssues) ? $fieldNameIssues : null,
                'debug_info' => [
                    'received_data' => $receivedData,
                    'content_type' => $request->header('Content-Type'),
                    'method' => $request->method(),
                ]
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }
    } */


    // LOGIN
    public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $credentials['email'])->first();

    if (!$user || !Hash::check($credentials['password'], $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // create a token for API access
    $token = $user->createToken('api-token', [], now()->addDays(7))->plainTextToken;


    return response()->json([
        'user' => $user,
        'token' => $token
    ]);
}


    // LOGOUT
    public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Logged out'
    ]);
}


    // PROFILE (Protected)
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    // UPDATE PROFILE
    public function updateProfile(Request $request)
    {
        try {
            $user = $request->user();

            $request->validate([
                'name' => 'sometimes|string|max:255',
                'gender' => 'sometimes|in:male,female',
                'password' => 'nullable|string|min:6|confirmed',
            ]);

            if ($request->has('name')) {
                $user->name = $request->name;
            }

            if ($request->has('gender')) {
                $user->gender = $request->gender;
            }

            // Only update password if user entered one
            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // UPDATE IMAGE
    public function updateImage(Request $request)
    {
        try {
            $user = $request->user();

            $request->validate([
                'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            ]);

            // Delete old image if exists
            if ($user->image && Storage::disk('public')->exists($user->image)) {
                Storage::disk('public')->delete($user->image);
            }

            // Store new image
            $imagePath = $request->file('image')->store('profiles', 'public');
            $user->image = $imagePath;
            $user->save();

            return response()->json([
                'message' => 'Image updated successfully',
                'user' => $user
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    
}
