-- Delete all question_options
DELETE FROM `question_options`;

-- Reset auto_increment to start from 1
ALTER TABLE `question_options` AUTO_INCREMENT = 1;

INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(1, 'Mild', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(1, 'Severe', 'ပြင်းထန်', 2, 1, NOW(), NOW());

-- Question 2: short of breath
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 'No', 'မပြောင်းလဲ', 0, 1, NOW(), NOW()),
(2, 'Slightly more', 'အနည်းငယ်ရှူမဝ', 1, 1, NOW(), NOW()),
(2, 'Much more', 'သိသာစွာရှူမဝ', 2, 1, NOW(), NOW());

-- Question 3: heart racing
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(3, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(3, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 4: swelling
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(4, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(4, 'Mild swelling', 'အနည်းငယ်ဖောင်း', 1, 1, NOW(), NOW()),
(4, 'Significant swelling', 'ပြင်းထန်ဖောင်း', 2, 1, NOW(), NOW());

-- Question 5: fatigued
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(5, 'Rarely', 'မကြာခဏမဖြစ်', 0, 1, NOW(), NOW()),
(5, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(5, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 6: lightheaded
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(6, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(6, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(6, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 7: neck/jaw pain
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(7, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(7, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(7, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 8: high blood pressure
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(8, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(8, 'Borderline', 'နည်းနည်းမြင့်', 1, 1, NOW(), NOW()),
(8, 'Yes', 'မြင့်', 2, 1, NOW(), NOW());

-- Question 9: blood pressure reading
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(9, 'Normal', 'ပုံမှန်', 0, 1, NOW(), NOW()),
(9, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(9, 'High', 'မြင့်', 1, 1, NOW(), NOW());

-- Question 10: cholesterol level
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(10, 'Normal', 'ပုံမှန်', 0, 1, NOW(), NOW()),
(10, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(10, 'High', 'မြင့်', 1, 1, NOW(), NOW());

-- Question 11: excessive sweating
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(11, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(11, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(11, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 12: wake up short of breath
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(12, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(12, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(12, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 13: leg pain/cramping
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(13, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(13, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(13, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Options for Question ID 14 (Family history of heart disease or stroke)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(14, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(14, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(14, 'Yes', 'ရှိပါသည်', 1, 1, NOW(), NOW());

-- Brain Questions Options (question_ids 15-28)

-- Question 15: headaches/migraines (Rarely/Sometimes/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(15, 'Rarely', 'မကြာခဏမဖြစ်', 0, 1, NOW(), NOW()),
(15, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(15, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 16: difficulty concentrating (Rarely/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(16, 'Rarely', 'မခက်ခဲ', 0, 1, NOW(), NOW()),
(16, 'Sometimes', 'တစ်ခါတစ်ရံခက်ခဲ', 1, 1, NOW(), NOW()),
(16, 'Often', 'မကြာခဏခက်ခဲ', 2, 1, NOW(), NOW());

-- Question 17: short-term memory (Good/Fair/Poor)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(17, 'Good', 'ကောင်းမွန်', 0, 1, NOW(), NOW()),
(17, 'Fair', 'သာမန်', 1, 1, NOW(), NOW()),
(17, 'Poor', 'မကောင်း', 2, 1, NOW(), NOW());

-- Question 18: brain fog (Rarely/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(18, 'Rarely', 'မရှိပါ', 0, 1, NOW(), NOW()),
(18, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(18, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 19: sleep quality (Good/Average/Poor)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(19, 'Good', 'ကောင်းမွန်', 0, 1, NOW(), NOW()),
(19, 'Average', 'သာမန်', 1, 1, NOW(), NOW()),
(19, 'Poor', 'မကောင်း', 2, 1, NOW(), NOW());

-- Question 20: dizziness (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(20, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(20, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(20, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 21: tingling/numbness (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(21, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(21, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(21, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 22: balance issues (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(22, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(22, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(22, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 23: finding words (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(23, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(23, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(23, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 24: smell/taste changes (No change/Slight change/Significant change)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(24, 'No change', 'မပြောင်းလဲ', 0, 1, NOW(), NOW()),
(24, 'Slight change', 'အနည်းငယ်ပြောင်း', 1, 1, NOW(), NOW()),
(24, 'Significant change', 'သိသာစွာပြောင်း', 2, 1, NOW(), NOW());

-- Question 25: light/sound sensitivity (No/Mild sensitivity/Severe sensitivity)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(25, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(25, 'Mild sensitivity', 'အနည်းငယ်မခံနိုင်', 1, 1, NOW(), NOW()),
(25, 'Severe sensitivity', 'ပြင်းထန်မခံနိုင်', 2, 1, NOW(), NOW());

-- Question 26: appetite (Normal/Reduced/Increased)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(26, 'Normal', 'ပုံမှန်', 0, 1, NOW(), NOW()),
(26, 'Reduced', 'လျော့နည်း', 1, 1, NOW(), NOW()),
(26, 'Increased', 'တိုးလာ', 1, 1, NOW(), NOW());

-- Question 27: tinnitus (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(27, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(27, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(27, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 28: confusion/disorientation (No/Once/Multiple times)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(28, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(28, 'Once', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(28, 'Multiple times', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Lungs Questions Options (question_ids 29-42)

-- Question 29: persistent cough (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(29, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(29, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(29, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 30: cough up phlegm (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(30, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(30, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(30, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 31: wheezing (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(31, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(31, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(31, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 32: short of breath at rest (No/Mild/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(32, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(32, 'Mild', 'အနည်းငယ်ရှူမဝ', 1, 1, NOW(), NOW()),
(32, 'Severe', 'ပြင်းထန်ရှူမဝ', 2, 1, NOW(), NOW());

-- Question 33: breathing compared to peers (Same as peers/Slightly worse/Much worse)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(33, 'Same as peers', 'အသက်တူများနှင့်တူ', 0, 1, NOW(), NOW()),
(33, 'Slightly worse', 'အနည်းငယ်နည်း', 1, 1, NOW(), NOW()),
(33, 'Much worse', 'အလွန်နည်း', 2, 1, NOW(), NOW());

-- Question 34: wake up not enough air (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(34, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(34, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(34, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 35: chest tightness (No/Mild tightness/Severe tightness)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(35, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(35, 'Mild tightness', 'အနည်းငယ်တင်းကျပ်', 1, 1, NOW(), NOW()),
(35, 'Severe tightness', 'ပြင်းထန်တင်းကျပ်', 2, 1, NOW(), NOW());

-- Question 36: respiratory infections (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(36, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(36, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(36, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 37: diagnosed with lung disease (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(37, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(37, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(37, 'Yes', 'ရှိပါသည်', 1, 1, NOW(), NOW());

-- Question 38: use inhalers (No/Occasionally/Regularly)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(38, 'No', 'မသုံးပါ', 0, 1, NOW(), NOW()),
(38, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(38, 'Regularly', 'အမြဲသုံး', 2, 1, NOW(), NOW());

-- Question 39: allergy symptoms (No/Mild/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(39, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(39, 'Mild', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(39, 'Severe', 'ပြင်းထန်', 2, 1, NOW(), NOW());

-- Question 40: snore/stop breathing (No/Sometimes/Yes often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(40, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(40, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(40, 'Yes often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 41: exposed to lung irritants (No/Occasionally/Regular exposure)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(41, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(41, 'Occasionally', 'တစ်ခါတစ်ရံထိတွေ့', 1, 1, NOW(), NOW()),
(41, 'Regular exposure', 'အမြဲထိတွေ့', 2, 1, NOW(), NOW());

-- Question 42: can't take deep breath (No/Sometimes/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(42, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(42, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(42, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Liver Questions Options (question_ids 43-47)

-- Question 43: exhaustion/pressure in upper right abdomen (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(43, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(43, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(43, 'Yes', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 44: yellowish eyes/pale nails (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(44, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(44, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(44, 'Yes', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 45: coated tongue (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(45, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(45, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(45, 'Yes', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 46: red patches on palms (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(46, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(46, 'Sometimes', 'အသေးစားထိခိုက်', 1, 1, NOW(), NOW()),
(46, 'Yes', 'ပြင်းထန်ထိခိုက်', 2, 1, NOW(), NOW());

-- Question 47: unexplained bruising/bleeding (No/Sometimes bruise easily/Yes frequent)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(47, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(47, 'Sometimes bruise easily', 'အလွယ်တကူ အမဲကွက်ထွက်တတ်', 1, 1, NOW(), NOW()),
(47, 'Yes frequent', 'မကြာခဏဖြစ်', 2, 1, NOW(), NOW());

-- Kidney Questions Options (question_ids 48-56)

-- Question 48: dark urine color (No/Sometimes dark/Consistently dark)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(48, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(48, 'Sometimes dark', 'တစ်ခါတစ်ရံ အရောင်မည်း', 1, 1, NOW(), NOW()),
(48, 'Consistently dark', 'အမြဲမည်း', 2, 1, NOW(), NOW());

-- Question 49: foamy urine (No/Sometimes foamy/Very foamy)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(49, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(49, 'Sometimes foamy', 'တစ်ခါတစ်ရံ အမြှုပ်များ', 1, 1, NOW(), NOW()),
(49, 'Very foamy', 'အမြဲအမြှုပ်များ', 2, 1, NOW(), NOW());

-- Question 50: blood in urine (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(50, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(50, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(50, 'Yes', 'ရှိပါသည်', 1, 1, NOW(), NOW());

-- Question 51: burning sensation (No/Mild burning/Severe pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(51, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(51, 'Mild burning', 'အနည်းငယ်ပူလောင်', 1, 1, NOW(), NOW()),
(51, 'Severe pain', 'ပြင်းထန်နာကျင်', 2, 1, NOW(), NOW());

-- Question 52: puffiness around eyes (No/Mild puffiness/Noticeable swelling)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(52, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(52, 'Mild puffiness', 'အနည်းငယ်ဖောင်း', 1, 1, NOW(), NOW()),
(52, 'Noticeable swelling', 'သိသာစွာဖောင်း', 2, 1, NOW(), NOW());

-- Question 53: ankle/foot swelling (No/Mild swelling/Significant swelling)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(53, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(53, 'Mild swelling', 'အနည်းငယ်ဖောင်း', 1, 1, NOW(), NOW()),
(53, 'Significant swelling', 'ပြင်းထန်ဖောင်း', 2, 1, NOW(), NOW());

-- Question 54: lower back pain (No/Occasional ache/Persistent pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(54, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(54, 'Occasional ache', 'တစ်ခါတစ်ရံနာ', 1, 1, NOW(), NOW()),
(54, 'Persistent pain', 'အမြဲနာ', 2, 1, NOW(), NOW());

-- Question 55: metallic taste/ammonia breath (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(55, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(55, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(55, 'Yes', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 56: dry itchy skin (No/Mild dryness/Severe itching)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(56, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(56, 'Mild dryness', 'အသားခြောက်နည်းနည်း', 1, 1, NOW(), NOW()),
(56, 'Severe itching', 'ပြင်းထန်ယားယံ', 2, 1, NOW(), NOW());

-- Stomach Questions Options (question_ids 57-75)

-- Question 57: stomach discomfort (Mild/Moderate/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(57, 'Mild', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(57, 'Moderate', 'အလယ်အလတ်', 2, 1, NOW(), NOW()),
(57, 'Severe', 'ပြင်းထန်', 3, 1, NOW(), NOW());

-- Question 58: bloated/gassy (No/Mild/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(58, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(58, 'Mild', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(58, 'Severe', 'ပြင်းထန်', 2, 1, NOW(), NOW());

-- Question 59: full quickly (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(59, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(59, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(59, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 60: loss of appetite (Normal/Reduced/No appetite)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(60, 'Normal', 'ပုံမှန်', 0, 1, NOW(), NOW()),
(60, 'Reduced', 'လျော့နည်း', 1, 1, NOW(), NOW()),
(60, 'No appetite', 'မစားချင်', 2, 1, NOW(), NOW());

-- Question 61: burning in chest/upper stomach (No/Mild burning/Severe burning)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(61, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(61, 'Mild burning', 'အနည်းငယ်ပူလောင်', 1, 1, NOW(), NOW()),
(61, 'Severe burning', 'ပြင်းထန်ပူလောင်', 2, 1, NOW(), NOW());

-- Question 62: acid coming up (No/Sometimes/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(62, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(62, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(62, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 63: worse after spicy food (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(63, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(63, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(63, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 64: burp/sour taste (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(64, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(64, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(64, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 65: nauseous today (No/Mild/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(65, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(65, 'Mild', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(65, 'Severe', 'ပြင်းထန်', 2, 1, NOW(), NOW());

-- Question 66: vomited today (No/Once/Multiple times)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(66, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(66, 'Once', 'တစ်ကြိမ်', 1, 1, NOW(), NOW()),
(66, 'Multiple times', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 67: vomit after eating (No/Sometimes/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(67, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(67, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(67, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 68: stomach pain with fever (No/Yes mild fever/Yes high fever)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(68, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(68, 'Yes, mild fever', 'အပူနည်းနည်း', 1, 1, NOW(), NOW()),
(68, 'Yes, high fever', 'အပူမြင့်', 2, 1, NOW(), NOW());

-- Question 69: stomach pain with diarrhea (No/Mild diarrhea/Severe diarrhea)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(69, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(69, 'Mild diarrhea', 'အနည်းငယ်ဝမ်းလျှော', 1, 1, NOW(), NOW()),
(69, 'Severe diarrhea', 'ပြင်းထန်ဝမ်းလျှော', 2, 1, NOW(), NOW());

-- Question 70: started after outside food (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(70, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(70, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(70, 'Yes', 'ဖြစ်ပါသည်', 1, 1, NOW(), NOW());

-- Question 71: wake up at night (No/Sometimes/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(71, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(71, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(71, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 72: pain when stomach empty (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(72, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(72, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(72, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 73: vomited blood/black material (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(73, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(73, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(73, 'Yes', 'ရှိပါသည်', 1, 1, NOW(), NOW());

-- Question 74: black/tar-like stools (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(74, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(74, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(74, 'Yes', 'ရှိပါသည်', 1, 1, NOW(), NOW());

-- Question 75: dizzy/weak/faint with stomach pain (No/Mild/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(75, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(75, 'Mild', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(75, 'Severe', 'ပြင်းထန်', 2, 1, NOW(), NOW());

-- Muscles Questions Options (question_ids 76-89)

-- Question 76: standing up from chair (No difficulty/Slight difficulty/Significant difficulty)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(76, 'No difficulty', 'ထနိုင်', 0, 1, NOW(), NOW()),
(76, 'Slight difficulty', 'အနည်းငယ်ခက်ခဲ', 1, 1, NOW(), NOW()),
(76, 'Significant difficulty', 'အလွန်ခက်ခဲ', 2, 1, NOW(), NOW());

-- Question 77: legs feel heavy (No/Sometimes heavy/Very heavy)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(77, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(77, 'Sometimes heavy', 'အနည်းငယ်လေးလံ', 1, 1, NOW(), NOW()),
(77, 'Very heavy', 'အလွန်လေးလံ', 2, 1, NOW(), NOW());

-- Question 78: stairs muscle fatigue (No/Mild fatigue/Severe weakness)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(78, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(78, 'Mild fatigue', 'အနည်းငယ်အင်အားနည်း', 1, 1, NOW(), NOW()),
(78, 'Severe weakness', 'အလွန်နည်း', 2, 1, NOW(), NOW());

-- Question 79: grip strength decrease (No change/Slight decrease/Significant decrease)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(79, 'No change', 'မပြောင်းလဲ', 0, 1, NOW(), NOW()),
(79, 'Slight decrease', 'အနည်းငယ်လျော့', 1, 1, NOW(), NOW()),
(79, 'Significant decrease', 'သိသာစွာလျော့', 2, 1, NOW(), NOW());

-- Question 80: balance issues (No/Occasionally unstable/Frequently unstable)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(80, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(80, 'Occasionally unstable', 'တစ်ခါတစ်ရံလဲကျမည်ထင်', 1, 1, NOW(), NOW()),
(80, 'Frequently unstable', 'မကြာခဏလဲကျမည်ထင်', 2, 1, NOW(), NOW());

-- Question 81: muscle cramps (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(81, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(81, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(81, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 82: muscle twitching (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(82, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(82, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(82, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 83: muscle soreness duration (No/Sometimes/Yes often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(83, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(83, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(83, 'Yes often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 84: muscle mass decrease (No/Slight decrease/Significant decrease)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(84, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(84, 'Slight decrease', 'အနည်းငယ်လျော့', 1, 1, NOW(), NOW()),
(84, 'Significant decrease', 'သိသာစွာလျော့', 2, 1, NOW(), NOW());

-- Question 85: replenish fluids (Always/Sometimes/Rarely)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(85, 'Always', 'အမြဲဖြည့်တင်း', 0, 1, NOW(), NOW()),
(85, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(85, 'Rarely', 'မဖြည့်တင်းလောက်', 2, 1, NOW(), NOW());

-- Question 86: alcohol muscle aches (No/Mild soreness/Severe pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(86, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(86, 'Mild soreness', 'အနည်းငယ်နာ', 1, 1, NOW(), NOW()),
(86, 'Severe pain', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Question 87: taking statins (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(87, 'No', 'မသောက်ပါ', 0, 1, NOW(), NOW()),
(87, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(87, 'Yes', 'သောက်နေပါသည်', 1, 1, NOW(), NOW());

-- Question 88: shoulder/neck tension (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(88, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(88, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(88, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 89: weakness after viral infection (No/Mild weakness/Significant weakness)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(89, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(89, 'Mild weakness', 'အနည်းငယ်အားနည်း', 1, 1, NOW(), NOW()),
(89, 'Significant weakness', 'ပြင်းထန်အားနည်း', 2, 1, NOW(), NOW());

-- Intestine Questions Options (question_ids 90-101)

-- Question 90: abdominal discomfort/bloating (No/Mild/Moderate)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(90, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(90, 'Mild', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(90, 'Moderate', 'အလယ်အလတ်', 2, 1, NOW(), NOW());

-- Question 91: diarrhea today (No/Mild/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(91, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(91, 'Mild', 'အနည်းငယ်ဝမ်းလျှော', 1, 1, NOW(), NOW()),
(91, 'Severe', 'ပြင်းထန်ဝမ်းလျှော', 2, 1, NOW(), NOW());

-- Question 92: gas/flatulence (No/Mild/Frequent)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(92, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(92, 'Mild', 'အနည်းငယ်လေထွက်', 1, 1, NOW(), NOW()),
(92, 'Frequent', 'မကြာခဏလေထွက်', 2, 1, NOW(), NOW());

-- Question 93: occasional nausea (No/Mild/Moderate)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(93, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(93, 'Mild', 'အနည်းငယ်မအီမသာ', 1, 1, NOW(), NOW()),
(93, 'Moderate', 'ပြင်းထန်မအီမသာ', 2, 1, NOW(), NOW());

-- Question 94: mucus in stool (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(94, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(94, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(94, 'Yes', 'ရှိပါသည်', 1, 1, NOW(), NOW());

-- Question 95: persistent cramps (No/Mild/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(95, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(95, 'Mild', 'အနည်းငယ်နာ', 1, 1, NOW(), NOW()),
(95, 'Severe', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Question 96: fatigue/weakness (No/Mild fatigue/Severe fatigue)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(96, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(96, 'Mild fatigue', 'အနည်းငယ်ပင်ပန်း', 1, 1, NOW(), NOW()),
(96, 'Severe fatigue', 'ပြင်းထန်ပင်ပန်း', 2, 1, NOW(), NOW());

-- Question 97: nausea with vomiting (No/Mild nausea/Vomiting)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(97, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(97, 'Mild nausea', 'အနည်းငယ်အန်ချင်', 1, 1, NOW(), NOW()),
(97, 'Vomiting', 'အန်ပါသည်', 2, 1, NOW(), NOW());

-- Question 98: blood in stool (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(98, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(98, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(98, 'Yes', 'ရှိပါသည်', 1, 1, NOW(), NOW());

-- Question 99: severe abdominal pain (No/Moderate/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(99, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(99, 'Moderate', 'အလယ်အလတ်နာ', 1, 1, NOW(), NOW()),
(99, 'Severe', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Question 100: sudden swollen abdomen (No/Mild swelling/Severe swelling)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(100, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(100, 'Mild swelling', 'အနည်းငယ်ဖောင်း', 1, 1, NOW(), NOW()),
(100, 'Severe swelling', 'ပြင်းထန်ဖောင်း', 2, 1, NOW(), NOW());

-- Question 101: dizzy/faint/weak (No/Mild dizziness/Severe weakness)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(101, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(101, 'Mild dizziness', 'မူးဝေ', 1, 1, NOW(), NOW()),
(101, 'Severe weakness', 'လဲကျမည်ထင်', 2, 1, NOW(), NOW());

-- Gall Bladder Questions Options (question_ids 102-109)

-- Question 102: pain after fatty foods (No/Mild discomfort/Severe pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(102, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(102, 'Mild discomfort', 'အနည်းငယ်မအီမသာ', 1, 1, NOW(), NOW()),
(102, 'Severe pain', 'ပြင်းထန်နာကျင်', 2, 1, NOW(), NOW());

-- Question 103: tenderness when pressing (No/Mild tenderness/Significant pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(103, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(103, 'Mild tenderness', 'အနည်းငယ်နာ', 1, 1, NOW(), NOW()),
(103, 'Significant pain', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Question 104: chills/low-grade fever (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(104, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(104, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(104, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 105: bloating/gas after meals (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(105, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(105, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(105, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 106: yo-yo dieting history (No/Occasionally/Yes repeatedly)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(106, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(106, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(106, 'Yes repeatedly', 'မကြာခဏဖြစ်', 2, 1, NOW(), NOW());

-- Question 107: anxiety/restless legs (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(107, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(107, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(107, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 108: sleepy day/insomnia night (No/Sometimes/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(108, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(108, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(108, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 109: burning palms/soles (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(109, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(109, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(109, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Pancreas Questions Options (question_ids 110-119)

-- Question 110: upper belly/back pain (No/Mild/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(110, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(110, 'Mild', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(110, 'Severe', 'ပြင်းထန်', 2, 1, NOW(), NOW());

-- Question 111: nausea/vomiting (No/Mild nausea/Vomiting)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(111, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(111, 'Mild nausea', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(111, 'Vomiting', 'အန်ပါသည်', 2, 1, NOW(), NOW());

-- Question 112: oily/pale/smelly stools (No/Slight change/Significant change)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(112, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(112, 'Slight change', 'အနည်းငယ်ပြောင်း', 1, 1, NOW(), NOW()),
(112, 'Significant change', 'သိသာစွာပြောင်း', 2, 1, NOW(), NOW());

-- Question 113: loss of appetite (Normal/Reduced/None)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(113, 'Normal', 'ပုံမှန်', 0, 1, NOW(), NOW()),
(113, 'Reduced', 'လျော့နည်း', 1, 1, NOW(), NOW()),
(113, 'None', 'မစားချင်', 2, 1, NOW(), NOW());

-- Question 114: sudden weight loss (No/Slight loss/Significant loss)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(114, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(114, 'Slight loss', 'အနည်းငယ်လျော့', 1, 1, NOW(), NOW()),
(114, 'Significant loss', 'သိသာစွာလျော့', 2, 1, NOW(), NOW());

-- Question 115: tired/dizzy/thirst/frequent urination (No/Mild symptoms/Severe symptoms)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(115, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(115, 'Mild symptoms', 'အနည်းငယ်လက္ခဏာ', 1, 1, NOW(), NOW()),
(115, 'Severe symptoms', 'ပြင်းထန်လက္ခဏာ', 2, 1, NOW(), NOW());

-- Question 116: yellowing skin/eyes (No/Slight yellowing/Clear yellowing)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(116, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(116, 'Slight yellowing', 'အနည်းငယ်ဝါ', 1, 1, NOW(), NOW()),
(116, 'Clear yellowing', 'သိသာစွာဝါ', 2, 1, NOW(), NOW());

-- Question 117: fever/feeling cold (No/Mild fever/High fever)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(117, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(117, 'Mild fever', 'အပူနည်းနည်း', 1, 1, NOW(), NOW()),
(117, 'High fever', 'အပူမြင့်', 2, 1, NOW(), NOW());

-- Question 118: pain after fatty meals (No/Mild pain/Severe pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(118, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(118, 'Mild pain', 'အနည်းငယ်နာ', 1, 1, NOW(), NOW()),
(118, 'Severe pain', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Question 119: bloating/gas/diarrhea (No/Mild/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(119, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(119, 'Mild', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(119, 'Severe', 'ပြင်းထန်', 2, 1, NOW(), NOW());

-- Skin Care Questions Options (question_ids 120-126)

-- Question 120: dry skin or patches (No/Mild dryness/Severe patches)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(120, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(120, 'Mild dryness', 'အနည်းငယ်ခြောက်', 1, 1, NOW(), NOW()),
(120, 'Severe patches', 'ပြင်းထန်ခြောက်', 2, 1, NOW(), NOW());

-- Question 121: new acne/breakouts (No/Mild/Severe)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(121, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(121, 'Mild', 'အနည်းငယ်ဝက်ခြံ', 1, 1, NOW(), NOW()),
(121, 'Severe', 'မကြာခဏထွက်', 2, 1, NOW(), NOW());

-- Question 122: red spots appearing (No/Few spots/Many spots)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(122, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(122, 'Few spots', 'အနည်းငယ်အစက်', 1, 1, NOW(), NOW()),
(122, 'Many spots', 'များစွာ', 2, 1, NOW(), NOW());

-- Question 123: swelling/puffy face (No/Mild puffiness/Severe swelling)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(123, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(123, 'Mild puffiness', 'အနည်းငယ်ဖောင်း', 1, 1, NOW(), NOW()),
(123, 'Severe swelling', 'ပြင်းထန်ဖောင်း', 2, 1, NOW(), NOW());

-- Question 124: pain when touching skin (No/Mild tenderness/Severe pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(124, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(124, 'Mild tenderness', 'အနည်းငယ်နာ', 1, 1, NOW(), NOW()),
(124, 'Severe pain', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Question 125: skin color changing (No/Slight change/Major change)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(125, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(125, 'Slight change', 'အနည်းငယ်ပြောင်း', 1, 1, NOW(), NOW()),
(125, 'Major change', 'သိသာစွာပြောင်း', 2, 1, NOW(), NOW());

-- Question 126: spots on sun-exposed areas (No/Few spots/Many spots)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(126, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(126, 'Few spots', 'အနည်းငယ်အစက်', 1, 1, NOW(), NOW()),
(126, 'Many spots', 'များစွာ', 2, 1, NOW(), NOW());

-- Bladder Questions Options (question_ids 127-131)

-- Question 127: blood/sediment in urine (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(127, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(127, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(127, 'Yes', 'ရှိပါသည်', 1, 1, NOW(), NOW());

-- Question 128: urinary incontinence/leaking (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(128, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(128, 'Occasionally', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(128, 'Frequently', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 129: stronger urine smell (No/Slightly stronger/Very strong smell)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(129, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(129, 'Slightly stronger', 'အနည်းငယ်ပြင်း', 1, 1, NOW(), NOW()),
(129, 'Very strong smell', 'အလွန်ပြင်း', 2, 1, NOW(), NOW());

-- Question 130: bladder not empty (No/Sometimes/Often)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(130, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(130, 'Sometimes', 'တစ်ခါတစ်ရံ', 1, 1, NOW(), NOW()),
(130, 'Often', 'မကြာခဏ', 2, 1, NOW(), NOW());

-- Question 131: pain/pressure lower abdomen (No/Mild pressure/Severe pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(131, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(131, 'Mild pressure', 'အနည်းငယ်ဖိအား', 1, 1, NOW(), NOW()),
(131, 'Severe pain', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Done

-- Bone Questions Options (question_ids 132-138)

-- Question 132: bone pain (No/Mild pain/Severe pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(132, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(132, 'Mild pain', 'အနည်းငယ်နာ', 1, 1, NOW(), NOW()),
(132, 'Severe pain', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Question 133: posture worsening (No/Slight worsening/Significant worsening)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(133, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(133, 'Slight worsening', 'အနည်းငယ်ဆိုးလာ', 1, 1, NOW(), NOW()),
(133, 'Significant worsening', 'သိသာစွာဆိုးလာ', 2, 1, NOW(), NOW());

-- Question 134: bones break easily (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(134, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(134, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(134, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Question 135: joints swollen (No/Mild swelling/Severe swelling)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(135, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(135, 'Mild swelling', 'အနည်းငယ်ဖောင်း', 1, 1, NOW(), NOW()),
(135, 'Severe swelling', 'ပြင်းထန်ဖောင်း', 2, 1, NOW(), NOW());

-- Question 136: pain near waist (No/Mild pain/Severe pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(136, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(136, 'Mild pain', 'အနည်းငယ်နာ', 1, 1, NOW(), NOW()),
(136, 'Severe pain', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Question 137: fingers shorter/curved (No/Slight change/Significant change)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(137, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(137, 'Slight change', 'အနည်းငယ်ပြောင်း', 1, 1, NOW(), NOW()),
(137, 'Significant change', 'သိသာစွာပြောင်း', 2, 1, NOW(), NOW());

-- Question 138: pain in major joints (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(138, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(138, 'Occasionally', 'တစ်ခါတစ်ရံနာ', 1, 1, NOW(), NOW()),
(138, 'Frequently', 'မကြာခဏနာ', 2, 1, NOW(), NOW());

-- Bone Questions Options (question_ids 132-138)

-- Question 132: bone pain (No/Mild pain/Severe pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(132, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(132, 'Mild pain', 'အနည်းငယ်နာ', 1, 1, NOW(), NOW()),
(132, 'Severe pain', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Question 133: posture worsening (No/Slight worsening/Significant worsening)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(133, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(133, 'Slight worsening', 'အနည်းငယ်ဆိုးလာ', 1, 1, NOW(), NOW()),
(133, 'Significant worsening', 'သိသာစွာဆိုးလာ', 2, 1, NOW(), NOW());

-- Question 134: bones break easily (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(134, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(134, 'Not sure', 'မသေချာ', 0, 1, NOW(), NOW()),
(134, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Question 135: joints swollen (No/Mild swelling/Severe swelling)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(135, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(135, 'Mild swelling', 'အနည်းငယ်ဖောင်း', 1, 1, NOW(), NOW()),
(135, 'Severe swelling', 'ပြင်းထန်ဖောင်း', 2, 1, NOW(), NOW());

-- Question 136: pain near waist (No/Mild pain/Severe pain)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(136, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(136, 'Mild pain', 'အနည်းငယ်နာ', 1, 1, NOW(), NOW()),
(136, 'Severe pain', 'ပြင်းထန်နာ', 2, 1, NOW(), NOW());

-- Question 137: fingers shorter/curved (No/Slight change/Significant change)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(137, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(137, 'Slight change', 'အနည်းငယ်ပြောင်း', 1, 1, NOW(), NOW()),
(137, 'Significant change', 'သိသာစွာပြောင်း', 2, 1, NOW(), NOW());

-- Question 138: pain in major joints (No/Occasionally/Frequently)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(138, 'No', 'မရှိပါ', 0, 1, NOW(), NOW()),
(138, 'Occasionally', 'တစ်ခါတစ်ရံနာ', 1, 1, NOW(), NOW()),
(138, 'Frequently', 'မကြာခဏနာ', 2, 1, NOW(), NOW());

-- Blood Vessels (Arteries) Questions Options (question_ids 139-146)

-- Question 139: chest discomfort spreading (No/Occasionally/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(139, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(139, 'Occasionally', 'ရံဖန်ရံခါ', 1, 1, NOW(), NOW()),
(139, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 140: short of breath walking/stairs (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(140, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(140, 'Sometimes', 'တခါတရံ', 1, 1, NOW(), NOW()),
(140, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 141: cold sweats/nausea with chest discomfort (No/Occasionally/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(141, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(141, 'Occasionally', 'ရံဖန်ရံခါ', 1, 1, NOW(), NOW()),
(141, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 142: sudden numbness/weakness one side (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(142, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(142, 'Not sure', 'သေချာမသိပါ', 0, 1, NOW(), NOW()),
(142, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Question 143: trouble speaking/understanding (No/Occasionally/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(143, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(143, 'Occasionally', 'ရံဖန်ရံခါ', 1, 1, NOW(), NOW()),
(143, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 144: sudden vision loss/blurriness (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(144, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(144, 'Sometimes', 'တခါတရံ', 1, 1, NOW(), NOW()),
(144, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 145: sudden dizziness/balance problems (No/Occasionally/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(145, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(145, 'Occasionally', 'ရံဖန်ရံခါ', 1, 1, NOW(), NOW()),
(145, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 146: worst headache of life (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(146, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(146, 'Not sure', 'သေချာမသိပါ', 0, 1, NOW(), NOW()),
(146, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Done

-- Male Reproductive System Questions Options (question_ids 147-156)

-- Question 147: lump/swelling/size change in testicle (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(147, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(147, 'Not sure', 'သေချာမသိပါ', 0, 1, NOW(), NOW()),
(147, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Question 148: testicles feel heavy/achy (No/Occasionally/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(148, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(148, 'Occasionally', 'ရံဖန်ရံခါ', 1, 1, NOW(), NOW()),
(148, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 149: pain in groin area (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(149, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(149, 'Sometimes', 'တခါတရံ', 1, 1, NOW(), NOW()),
(149, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 150: blood in urine/semen (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(150, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(150, 'Not sure', 'သေချာမသိပါ', 0, 1, NOW(), NOW()),
(150, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Question 151: erection difficulty/curvature/pain (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(151, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(151, 'Sometimes', 'တခါတရံ', 1, 1, NOW(), NOW()),
(151, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 152: decrease in sexual desire (No/A Little/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(152, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(152, 'A Little', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(152, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 153: pain during/after ejaculation (No/Occasionally/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(153, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(153, 'Occasionally', 'ရံဖန်ရံခါ', 1, 1, NOW(), NOW()),
(153, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 154: breast enlargement/tenderness (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(154, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(154, 'Not sure', 'သေချာမသိပါ', 0, 1, NOW(), NOW()),
(154, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Question 155: unable to conceive (No/Not Applicable/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(155, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(155, 'Not Applicable', 'သက်ဆိုင်ခြင်းမရှိပါ', 0, 1, NOW(), NOW()),
(155, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Female Reproductive System Questions Options (question_ids 156-172)

-- Question 156: heavy periods (No/Often/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(156, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(156, 'Often', 'ခဏခဏဖြစ်တတ်ပါသည်', 1, 1, NOW(), NOW()),
(156, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 157: severe menstrual symptoms (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(157, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(157, 'Sometimes', 'တခါတရံ', 1, 1, NOW(), NOW()),
(157, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 158: irregular menstrual cycle (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(158, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(158, 'Not sure', 'သေချာမသိပါ', 0, 1, NOW(), NOW()),
(158, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Question 159: bleed between periods/after sex (No/Occasionally/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(159, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(159, 'Occasionally', 'ရံဖန်ရံခါ', 1, 1, NOW(), NOW()),
(159, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 160: chronic lower abdominal/pelvic pain (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(160, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(160, 'Sometimes', 'တခါတရံ', 1, 1, NOW(), NOW()),
(160, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 161: pain during/after intercourse/bowel/urination (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(161, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(161, 'Sometimes', 'တခါတရံ', 1, 1, NOW(), NOW()),
(161, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 162: unusual vaginal discharge (No/A Little/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(162, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(162, 'A Little', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(162, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 163: itching/burning/irritation (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(163, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(163, 'Sometimes', 'တခါတရံ', 1, 1, NOW(), NOW()),
(163, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 164: vaginal dryness during sex (No/Occasionally/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(164, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(164, 'Occasionally', 'ရံဖန်ရံခါ', 1, 1, NOW(), NOW()),
(164, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 165: sores/bumps/growths (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(165, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(165, 'Not sure', 'သေချာမသိပါ', 0, 1, NOW(), NOW()),
(165, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Question 166: hot flashes/night sweats (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(166, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(166, 'Sometimes', 'တခါတရံ', 1, 1, NOW(), NOW()),
(166, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 167: trouble sleeping (No/Occasionally/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(167, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(167, 'Occasionally', 'ရံဖန်ရံခါ', 1, 1, NOW(), NOW()),
(167, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 168: changes in mood/memory/concentration (No/Sometimes/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(168, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(168, 'Sometimes', 'တခါတရံ', 1, 1, NOW(), NOW()),
(168, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 169: weight gain especially abdomen (No/A Little/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(169, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(169, 'A Little', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(169, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 170: increased facial hair/thinning scalp hair (No/Not sure/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(170, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(170, 'Not sure', 'သေချာမသိပါ', 0, 1, NOW(), NOW()),
(170, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());

-- Question 171: decreased interest in sex (No/A Little/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(171, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(171, 'A Little', 'အနည်းငယ်', 1, 1, NOW(), NOW()),
(171, 'Yes', 'ဟုတ်ကဲ့', 2, 1, NOW(), NOW());

-- Question 172: unable to conceive (No/Not Applicable/Yes)
INSERT INTO `question_options` (`question_id`, `option_text_en`, `option_text_mm`, `score`, `is_active`, `created_at`, `updated_at`) VALUES
(172, 'No', 'မဟုတ်ပါ', 0, 1, NOW(), NOW()),
(172, 'Not Applicable', 'သက်ဆိုင်ခြင်းမရှိပါ', 0, 1, NOW(), NOW()),
(172, 'Yes', 'ဟုတ်ကဲ့', 1, 1, NOW(), NOW());



