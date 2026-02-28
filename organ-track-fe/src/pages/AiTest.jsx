import { useState } from "react";
import { OpenRouter } from "@openrouter/sdk";

export default function AiTest() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testAI = async () => {
    setLoading(true);

    const client = new OpenRouter({
      apiKey:
        "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",
    });

    const prompt = `
You are a health symptom analysis assistant for a mobile health tracking app.

Your job:
Analyze the provided question and answer pairs related to ONE organ and generate structured health insights for a user interface.

IMPORTANT RULES:
- This is NOT a medical diagnosis.
- Use calm, supportive language.
- Avoid scary or alarming words.
- Do not mention AI, analysis, or reasoning.
- Do not explain anything outside the format.
- Keep language simple and easy to read.

STRICT OUTPUT FORMAT:
You MUST follow this exact structure and section titles.
Do not add extra sections.
Do not remove sections.
Number of items in each section can vary.

OUTPUT FORMAT:

Possible Indicators:
- Short possible condition or interpretation
- Short possible condition or interpretation
- Short possible condition or interpretation

Immediate Recommendations:
- Short, clear action the user can do now
- Short, clear action the user can do now
- Short, clear action the user can do now

Lifestyle Adjustments:
- Long-term healthy habit suggestion
- Long-term healthy habit suggestion
- Long-term healthy habit suggestion

Seek Medical Help If You Experience:
- Clear red flag symptom
- Clear red flag symptom
- Clear red flag symptom

TONE GUIDELINES:
- Use phrases like: "may indicate", "could be related to"
- Avoid diagnosis phrases like: "you have"
- Avoid medical jargon
- Keep each bullet short and mobile-friendly

Now analyze the following answers:

Organ: Stomach

Q1: How often do you feel stomach pain?
Answer: Frequently

Q2: Do you feel burning after meals?
Answer: Yes, especially after spicy food

Q3: Do you feel bloated?
Answer: Yes

Q4: Do you feel nausea?
Answer: Occasionally

Q5: Do you skip meals?
Answer: Yes

Q6: Do you eat spicy food often?
Answer: Yes

Q7: Do symptoms worsen during stress?
Answer: Yes

Q8: Do you drink enough water?
Answer: Not really

Q9: Do you feel acid in your throat?
Answer: Sometimes

Q10: Do you feel full quickly?
Answer: Occasionally
`;

    try {
      const response = await client.chat.send({
        chatGenerationParams: {
          model: "stepfun/step-3.5-flash:free",
          messages: [{ role: "user", content: prompt }],
        },
      });

      const text = response.choices[0].message.content;
      setResult(text);
    } catch (err) {
      console.error(err);
      setResult("Error calling AI");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>OpenRouter SDK Test</h2>

      <button onClick={testAI} disabled={loading}>
        {loading ? "Thinking..." : "Test AI"}
      </button>

      <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>{result}</pre>
    </div>
  );
}
