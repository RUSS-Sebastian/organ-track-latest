-- Delete all questions
DELETE FROM `questions`;

-- Reset auto_increment to start from 1
ALTER TABLE `questions` AUTO_INCREMENT = 1;

-- Heart Questions (organ_id = 1)
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES

('Symptom', 1, 'Do you ever experience chest pain, tightness, or discomfort?', 'ရင်ဘတ်အောင့်ခြင်း၊ တင်းခြင်း (သို့မဟုတ်) မသက်မသာ ခံစားရဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 1, 'Do you get short of breath more easily than before during routine activities?', 'ပုံမှန်လှုပ်ရှားမှုများအတွင်း ယခင်ကထက် အသက်ရှူမဝခြင်း ပိုဖြစ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 1, 'Do you ever feel your heart racing, pounding, or skipping beats?', 'နှလုံးခုန်မြန်ခြင်း၊ ပြင်းခြင်း (သို့မဟုတ်) ခုန်ကျော်ခြင်းများ ခံစားရဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 1, 'Do you often experience swelling in your ankles, feet, or legs?', 'ခြေကျင်းဝတ်၊ ခြေဖဝါး၊ ခြေထောက်များတွင် ရောင်ရမ်းခြင်း ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 1, 'How often do you feel unusually fatigued or low on energy?', 'ပုံမှန်မဟုတ်သော ပင်ပန်းနွမ်းနယ်ခြင်း (သို့မဟုတ်) စွမ်းအင်နည်းခြင်း ဘယ်လောက်မကြာခဏ ခံစားရပါသလဲ။', 'single', 1, NOW(), NOW()),

('Symptom', 1, 'Do you ever feel lightheaded or like you might faint?', 'ခေါင်းမူးခြင်း (သို့မဟုတ်) သတိလစ်မည့်လိုလို ခံစားရဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 1, 'Do you experience pain in your neck, jaw, throat, or upper back?', 'လည်ပင်း၊ မေးရိုး၊ လည်ချောင်း၊ နောက်ကျောအပေါ်ပိုင်းတွင် နာကျင်မှု ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Daily', 1, 'Have you been told you have high blood pressure?', 'သွေးတိုးရှိသည်ဟု ပြောခံရဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Daily', 1, 'What was your most recent blood pressure reading, if known?', 'သိပါက နောက်ဆုံး သွေးပေါင်ချိန်ဖတ်တန်ဖိုးက ဘယ်လောက်လဲ။', 'single', 1, NOW(), NOW()),

('Daily', 1, 'What was your most recent cholesterol level, if known?', 'သိပါက နောက်ဆုံး ကိုလက်စထရော (Cholesterol) အဆင့်က ဘယ်လောက်လဲ။', 'single', 1, NOW(), NOW()),

('Symptom', 1, 'Do you experience excessive sweating without physical exertion or heat?', 'ကိုယ်လက်လှုပ်ရှားမှု (သို့မဟုတ်) အပူမရှိဘဲ အလွန်အမင်း ချွေးထွက်ခြင်း ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 1, 'Do you often wake up at night feeling short of breath?', 'ညဘက်တွင် အသက်ရှူမဝသည်ဟု ခံစားရကာ မကြာခဏ နိုးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 1, 'Do you get pain or cramping in your legs when walking that goes away with rest?', 'လမ်းလျှောက်ရာတွင် ခြေထောက် နာကျင်/ကြွက်တက်ပြီး အနားယူလျှင် ပျောက်ပါသလား။', 'single', 1, NOW(), NOW()),

('Daily', 1, 'Do you have a family history of heart disease or stroke?', 'မိသားစုတွင် နှလုံးရောဂါ (သို့မဟုတ်) လေဖြတ်ရောဂါ ရာဇဝင်ရှိပါသလား။', 'single', 1, NOW(), NOW());

-- Brain Questions (organ_id = 2) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 2, 'How often do you experience frequent headaches or migraines?', 'ခေါင်းကိုက်ခြင်း (သို့) ခေါင်းတစ်ခြမ်းကိုက်ခြင်း ဘယ်လောက်မကြာခဏခံစားရပါသလဲ။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'Do you often have difficulty concentrating or focusing on tasks?', 'အလုပ်များကို အာရုံ စူးစိုက်ရန်ခက်ခဲပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'How is your short-term memory?', 'သင့်ရဲ့ကာလတိုမှတ်ဉာဏ်က ဘယ်လိုအခြေအနေရှိပါသလဲ။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'Do you often feel persistent brain fog or mental fatigue?', 'ဦးနှောက်ဝေဝါးခြင်း (သို့) စိတ်ပင်ပန်းနွမ်းနယ်ခြင်းခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'How would you rate the quality of your sleep?', 'သင့်အိပ်စက်မှု အရည်အသွေးကို ဘယ်လိုအဆင့်သတ်မှတ်မည်နည်း။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'Have you experienced any dizziness or vertigo lately?', 'မကြာသေးမီက မူးဝေခြင်း(သို့) ခေါင်းထွေးခြင်းခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'Do you ever experience tingling or numbness in your face, hands, or feet?', 'မျက်နှာ၊ လက်၊ ခြေထောက်များတွင် ထုံကျင် ကိုက်ခဲခြင်း ခံစားရဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'Have you had any issues with balance or coordination recently?', 'မကြာသေးမီက ဟန်ချက်ထိန်းခြင်း ဆိုင်ရာ ပြဿနာများ ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'Do you often have difficulty finding the right words during conversation?', 'စကားပြောဆိုရာတွင် မှန်ကန်သော စကားလုံးရှာဖွေရန် ခက်ခဲပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'Have you noticed any changes in your sense of smell or taste?', 'သင့်ရဲ့ အနံ့ခံအာရုံ (သို့) အရသာအာရုံ ပြောင်းလဲမှုများသတိထားမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'Do you experience sensitivity to light or sound more than usual?', 'အလင်းရောင်(သို့) အသံအတွက်ပုံမှန်ထက်ပို၍ အာရုံခံစားမှုရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'How is your appetite? Has it changed recently?', 'သင့်အစားစားချင်စိတ်က ဘယ်လိုနေပါသလဲ။ မကြာသေးမီကပြောင်းလဲခဲ့ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'Do you ever experience ringing in your ears (tinnitus)?', 'နားထဲတွင် အသံမြည်ခြင်း ခံစားရဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 2, 'Have you had any episodes of confusion or disorientation about time/place recently?', 'မကြာသေးမီက အချိန်/နေရာအပေါ် ရှုပ်ထွေးခြင်း (သို့) လမ်းမှားခြင်းဖြစ်ရပ်များရှိပါသလား။', 'single', 1, NOW(), NOW());

-- Lungs Questions (organ_id = 3) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 3, 'Do you have a persistent or recurring cough?', 'ဆက်တိုက် (သို့မဟုတ်) ထပ်ခါထပ်ခါ ချောင်းဆိုးခြင်း ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Do you cough up phlegm or mucus regularly?', 'သလိပ် (သို့မဟုတ်) အကျွမ်းများကို ပုံမှန် ချောင်းဆိုးထွက်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Do you experience wheezing (a whistling sound when breathing)?', 'အသက်ရှူရာတွင် တစီစီ မြည်သံထွက်ခြင်း ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Do you feel short of breath even while at rest?', 'အနားယူနေစဉ်တွင်ပင် အသက်ရှူမဝသလို ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'How is your breathing during physical activity compared to peers your age?', 'သင့်အသက်အရွယ်တူများနှင့် ယှဉ်လျှင် ကိုယ်လက်လှုပ်ရှားမှုအတွင်း အသက်ရှူခြင်းက ဘယ်လိုနေပါသလဲ။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Do you often wake up feeling like you haven''t gotten enough air?', 'လေအလုံအလောက်မရသလို ခံစားရကာ မကြာခဏ နိုးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Have you noticed any chest tightness when breathing?', 'အသက်ရှူရာတွင် ရင်ဘတ်တင်းခြင်း သတိထားမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Do you frequently get respiratory infections like bronchitis?', 'လေပြွန်ရောင်ရမ်းခြင်းကဲ့သို့သော အသက်ရှူလမ်းကြောင်း ပိုးဝင်ခြင်းများ မကြာခဏ ဖြစ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Have you ever been diagnosed with asthma, COPD, or other lung disease?', 'ပန်းနာရင်ကျပ်၊ COPD (သို့မဟုတ်) အခြား အဆုတ်ရောဂါတစ်ခုခု ရှိသည်ဟု ရောဂါရှာဖွေတွေ့ရှိထားပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Do you use any inhalers or breathing treatments?', 'အင်ဟေလာ (Inhaler) သို့မဟုတ် အသက်ရှူကုထုံးများ သုံးစွဲပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Do you experience frequent allergy symptoms that affect your breathing?', 'အသက်ရှူခြင်းကို ထိခိုက်စေသော ဓာတ်မတည့်ရောဂါ လက္ခဏာများ မကြာခဏ ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Do you snore loudly or have been told you stop breathing during sleep?', 'အိပ်နေစဉ် ဆူညံစွာ ဟောက်ခြင်း (သို့မဟုတ်) အသက်ရှူရပ်သွားသည်ဟု ပြောခံရဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Have you been exposed to lung irritants regularly?', 'အဆုတ်ကို အခြေအနေဆိုးရွားစေသည့် ပစ္စည်းများကို မကြာခဏ ထိတွေ့ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 3, 'Do you feel like you can''t take a deep, satisfying breath?', 'နက်ရှိုင်း ကျေနပ်ဖွယ် အသက်ရှူလို့ မရသလို ခံစားရပါသလား။', 'single', 1, NOW(), NOW());

-- Liver Questions (organ_id = 4) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 4, 'Do you experience unexplained exhaustion or a feeling of tightness/pressure in the upper right abdomen (under the ribs)?', 'အကြောင်းရင်းမရှိဘဲ နုံးချိတာ၊ ဗိုက်ညာဘက်အပေါ်ပိုင်း (နံရိုးအောက်) မှာ တင်းကျပ်ကျပ် ခံစားရတာမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 4, 'When you wake up, are the whites of your eyes yellowish or muddy? Are your fingernails pale instead of pinkish?', 'မနက်အိပ်ရာနိုးတဲ့အခါ မျက်လုံးမျက်ဖြူသားတွေမှာ ဝါတာ၊ နောက်တာမျိုး ရှိပါသလား။ လက်သည်းခွံတွေမှာ ပန်းရောင်မသန်းဘဲ ဖြူဖျော့နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 4, 'When looking in the mirror, is your tongue covered with a thick white or yellow coating?', 'သင့်ရဲ့ လျှာကို မှန်ထဲမှာ ကြည့်တဲ့အခါ လျှာပေါ်မှာ အဖြူဖတ်တွေ ဒါမှမဟုတ် အဝါရောင် အဖတ်တွေ ထူထူထဲထဲ ဖုံးနေတာမျိုး (Coated Tongue) ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 4, 'When you spread both palms, do you see significant red patches on the outer edges?', 'သင့်ရဲ့ လက်ဖဝါး နှစ်ဖက်လုံးကို ဖြန့်ကြည့်တဲ့အခါ လက်ဖဝါး ဘေးစောင်းတွေမှာ အနီကွက်တွေ သိသိသာသာ ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 4, 'Do you experience unexplained bruising or find that bleeding takes a long time to stop after a cut?', 'ခန္ဓာကိုယ်တွင် အကြောင်းရင်းမရှိဘဲ အညိုအမည်းစွဲခြင်း (သို့မဟုတ်) ဒဏ်ရာရလျှင် သွေးတိတ်ရန် ကြာခြင်းမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW());

-- Kidney Questions (organ_id = 5) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 5, 'Even when you drink plenty of water, is your urine color consistently dark tea-colored or cola-colored?', 'သင့်ရဲ့ ဆီးအရောင်ဟာ ရေများများသောက်ပါလျက်နဲ့ လက်ဖက်ရည်ရင့်ရောင် (သို့မဟုတ်) ကိုကာကိုလာအရောင်မျိုး ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 5, 'When you urinate, are there excessive soap-like bubbles (foam) that remain even after flushing?', 'ဆီးသွားတဲ့အခါ ဆပ်ပြာပူဖောင်းတွေလိုမျိုး အမြှုပ်တွေ အလွန်အမင်းထနေပြီး ရေလောင်းချသော်လည်း မပျောက်ဘဲ ကျန်နေတတ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 5, 'Have you ever noticed blood in your urine or seen it turn a reddish-brown color?', 'ဆီးသွားတဲ့အခါ ပုံမှန်မဟုတ်ဘဲ သွေးစလေးတွေပါတာ ဒါမှမဟုတ် နီညိုရောင်ဖြစ်နေတာမျိုး ကြုံဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 5, 'Do you experience a burning sensation or pain along the urinary tract when urinating?', 'ဆီးသွားတဲ့အခါ ဆီးလမ်းကြောင်း တစ်လျှောက်မှာ ပူစပ်ပူလောင်ဖြစ်တာ ဒါမှမဟုတ် အောင့်တာမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 5, 'When you wake up in the morning, is there noticeable puffiness or swelling around your eyes?', 'မနက်အိပ်ရာနိုးတဲ့အခါ မျက်လုံးတစ်ဝိုက်မှာ ဖောင်းအစ်နေတာမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 5, 'By the end of the day, are your ankles or feet swollen, leaving an indentation if you press on them?', 'ညနေပိုင်းမှာ ခြေကျင်းဝတ် ဒါမှမဟုတ် ခြေဖဝါးတွေ ဖောရောင်နေပြီး ဖိကြည့်ရင် ချိုင့်ဝင်နေတတ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 5, 'Do you feel a persistent ache in your lower back, just below the ribs (on either the right or left side)?', 'ခါးနောက်ဘက် နံရိုးအောက်တည့်တည့် (ညာဘက် သို့မဟုတ် ဘယ်ဘက်) မှာ တစစ်စစ်နဲ့ ကိုက်ခဲနေတာမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 5, 'Do you notice a metallic, rust-like taste in your mouth, or feel like your breath smells like ammonia (urine-like)?', 'ခံတွင်းထဲမှာ သံချေးနံ့လိုမျိုး သတ္တုအရသာ ရနေတာ ဒါမှမဟုတ် အသက်ရှူရင် အမိုးနီးယားနံ့ (ဆီးနံ့) ထွက်နေတယ်လို့ ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 5, 'Is your skin extremely dry and itchy all over your body?', 'အရေပြားတွေ အလွန်အမင်း ခြောက်သွေ့ပြီး တစ်ကိုယ်လုံး အနှံ့အပြားမှာ ယားယံနေတာမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW());

-- Stomach Questions (organ_id = 6) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 6, 'Do you feel stomach discomfort today?', 'ဒီနေ့ ဗိုက်အောင့်တာ၊ မအီမသာ ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you feel bloated or gassy?', 'ဗိုက်ဖောင်းတာ၊ လေပြည့်နေသလို ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you feel full very quickly when eating?', 'အစာနည်းနည်းပဲ စားရင် ပြည့်သလို ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you have loss of appetite today?', 'ဒီနေ့ အစာစားချင်စိတ် လျော့နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you feel burning in your chest or upper stomach?', 'ရင်ပူတာ၊ ဗိုက်အပေါ်ဘက် ပူနာနေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you feel acid coming up to your throat or mouth?', 'ချဉ်ချဉ်ရသာ လည်ချောင်းထိ ပြန်တက်လာသလို ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do symptoms get worse after spicy, oily, or sour food?', 'စပ်တဲ့၊ ဆီများတဲ့၊ ချဉ်တဲ့ အစာစားပြီးနောက် ပိုဆိုးလာပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you burp often or feel sour taste in your mouth?', 'လေထွက်များတာ၊ ပါးစပ်ထဲ ချဉ်ချဉ်ရသာ ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you feel nauseous today?', 'ဒီနေ့ အန်ချင်သလို ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Have you vomited today?', 'ဒီနေ့ အန်ခဲ့ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you vomit after eating?', 'အစာစားပြီးနောက် အန်တတ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you have stomach pain with fever?', 'ဗိုက်နာတာနဲ့အတူ ကိုယ်အပူတက်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you have stomach pain with diarrhea?', 'ဗိုက်နာပြီး ဝမ်းလျှောနေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Did symptoms start suddenly after eating outside food?', 'ပြင်ပအစာစားပြီးနောက် ရုတ်တရက် လက္ခဏာတွေ ဖြစ်လာပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Does stomach pain wake you up at night?', 'ညအိပ်နေချိန် ဗိုက်နာလို့ နိုးထရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you feel pain when your stomach is empty?', 'ဗိုက်အလွတ်ဖြစ်တဲ့အချိန် နာလာပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Have you vomited blood or black material?', 'သွေးပါအန်တာ၊ ကော်ဖီရည်လို အမည်းရောင် အန်တာ ဖြစ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you have black or tar-like stools?', 'ဝမ်းအမည်းရောင်၊ ဆီကပ်ကပ်လို ထွက်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 6, 'Do you feel dizzy, weak, or about to faint with stomach pain?', 'ဗိုက်နာနဲ့အတူ မူးဝေ၊ အားနည်း၊ လဲမိသလို ခံစားရပါသလား။', 'single', 1, NOW(), NOW());

-- Muscles Questions (organ_id = 7) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 7, 'When standing up from a chair, can you rise easily using only your leg strength without pushing off with your hands?', 'ထိုင်ခုံမှ ထသည့်အခါ လက်ဖြင့် အားမပြုဘဲ ခြေထောက်အားသက်သက်ဖြင့် လွယ်ကူစွာ ထနိုင်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'When walking, do your legs feel heavy, as if weights are attached to them, making it difficult to move?', 'လမ်းလျှောက်သည့်အခါ ခြေထောက်များတွင် ခဲဆွဲထားသလို လေးလံနေပြီး မသယ်ချင်သလို ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'When climbing stairs, do the muscles in your calves and thighs give out or fatigue before you even feel out of breath?', 'လှေကားတက်သည့်အခါ အသက်ရှူမဝခြင်းထက် ခြေသလုံးနှင့် ပေါင်ကြွက်သားများက အရင်ဆုံး အားပြတ်သွားတတ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'Has your grip strength (the ability to grasp things firmly with your palm) noticeably decreased?', 'လက်ဖဝါးဖြင့် တစ်ခုခုကို ဆုပ်ကိုင်သည့်အား (Grip Strength) သိသိသာသာ လျော့နည်းသွားပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'Do you find it difficult to maintain your physical balance, frequently feeling as though you might stumble or fall?', 'ခန္ဓာကိုယ်ဟန်ချက်ကို ကောင်းကောင်းမထိန်းနိုင်ဘဲ မကြာခဏ ယိုင်လဲချင်သလို ဖြစ်တတ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'While sleeping at night or while sitting, do your calf muscles suddenly knot up and cause sharp pain (cramps)?', 'ညဘက်အိပ်ပျော်နေစဉ် သို့မဟုတ် ထိုင်နေရင်း ခြေသလုံးကြွက်သားများ ရုတ်တရက် လိပ်တက်ပြီး နာကျင်ခြင်း (Cramps) ဖြစ်တတ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'Do you notice any involuntary twitching or rippling of muscles under the skin?', 'ကြွက်သားတစ်ခုခုသည် အလိုအလျောက် ခုန်နေခြင်း သို့မဟုတ် တုန်ခါနေခြင်းမျိုး (Twitching) ကို အရေပြားအောက်တွင် မြင်တွေ့ရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'Does muscle soreness last for more than two days after you exercise or perform physical labor?', 'လေ့ကျင့်ခန်းလုပ်ပြီးနောက် သို့မဟုတ် အလုပ်လုပ်ပြီးနောက် ကြွက်သားနာကျင်မှုမှာ (၂) ရက်ထက်ပို၍ ကြာရှည်နေတတ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'Has your body''s muscle mass noticeably decreased, leaving the tissue feeling soft or flabby compared to before?', 'ခန္ဓာကိုယ်၏ ကြွက်သားထုမှာ အရင်ကထက် သိသိသာသာ လျော့နည်းသွားပြီး ပျော့ဖတ်ဖတ် ဖြစ်သွားပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'Do you replenish your fluids and electrolytes after exercising or a long day of tiring work?', 'အားကစားလုပ်ပြီးနောက် သို့မဟုတ် အလုပ်ပင်ပန်းပြီးနောက် ရေဓာတ်နှင့် အီလက်ထရိုလိုက် (Electrolytes) ကို ပြန်လည်ဖြည့်တင်းပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'Do you experience muscle aches and pains the day after consuming excessive amounts of alcohol?', 'အရက်ကို အလွန်အမင်း သောက်သုံးခြင်းကြောင့် နောက်တစ်နေ့တွင် ကြွက်သားများ နာကျင်ကိုက်ခဲခြင်း ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'Are you currently taking cholesterol-lowering medications (Statins) on a regular basis?', 'လက်ရှိတွင် သွေးတွင်းအဆီချဆေး (Statins) ကို ပုံမှန်သောက်သုံးနေရသူ ဖြစ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'Do your shoulder and neck muscles automatically become stiff and tense when you are under high stress?', 'စိတ်ဖိစီးမှုများသည့်အခါ ပခုံးနှင့် ဇက်ကြောကြွက်သားများ အလိုအလျောက် တောင့်တင်းလာတတ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 7, 'Have you experienced muscle weakness or lack of strength following a recent severe viral infection?', 'မကြာသေးမီက ပြင်းထန်သော ဗိုင်းရပ်စ်ပိုး ကူးစက်ခံရပြီးနောက် ကြွက်သားများ အားအင်ချည့်နဲ့သွားခြင်း ရှိပါသလား။', 'single', 1, NOW(), NOW());

-- Intestine Questions (organ_id = 8) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 8, 'Do you feel mild abdominal discomfort or bloating today?', 'ဒီနေ့ ဗိုက်ထဲက မအီမသာဖြစ်ခြင်း (သို့မဟုတ်) လေပွခြင်းမျိုး ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Do you have diarrhea today?', 'ဒီနေ့ ဝမ်းလျှောနေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Do you have mild gas or flatulence?', 'လေပွခြင်း (သို့မဟုတ်) လေခဏခဏလည်ခြင်းမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Any occasional nausea or mild stomach discomfort?', 'ရံဖန်ရံခါ ပျို့အန်ချင်စိတ်ဖြစ်ခြင်း (သို့မဟုတ်) ဗိုက်ထဲ မအီမသာဖြစ်ခြင်းမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Did you notice any mucus in your stool?', 'ဝမ်းထဲမှာ အချွဲတွေပါတာမျိုး သတိထားမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Any persistent abdominal cramps or pain?', 'ဗိုက်ထဲက ရစ်နာတာ (သို့မဟုတ်) နာကျင်တာမျိုး တောက်လျှောက်ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Do you feel unexplained fatigue or weakness?', 'အကြောင်းရင်းမရှိဘဲ ပင်ပန်းနွမ်းနယ်တာ (သို့မဟုတ်) အားနည်းတာမျိုး ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Any nausea with vomiting today?', 'ဒီနေ့ ပျို့အန်တာမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Have you noticed blood in your stool?', 'ဝမ်းထဲမှာ သွေးပါလာတာမျိုး သတိထားမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Do you have severe abdominal pain?', 'ဗိုက် အပြင်းအထန် နာကျင်ခြင်း ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Any sudden swollen abdomen?', 'ဗိုက်က ရုတ်တရက် ဖောင်းကားလာတာမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 8, 'Are you feeling dizzy, faint, or very weak?', 'ခေါင်းမူးတာ၊ မူးလဲချင်သလိုဖြစ်တာ (သို့မဟုတ်) အရမ်းအားနည်းနေတာမျိုး ခံစားရပါသလား။', 'single', 1, NOW(), NOW());

-- Gall Bladder Questions (organ_id = 9) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES

('Symptom', 9, 'Do you feel nauseous or get a sharp, stabbing pain under your right ribs—possibly spreading to your shoulder or back—whenever you eat high-fat or greasy foods?', 'ဆီကြော်စာတွေ စားပြီးတဲ့အခါမှာ ပျို့အန်ချင်စိတ် ဖြစ်ပေါ်ခြင်းနဲ့အတူ ညာဘက်နံရိုးအောက်ကနေ စူးခနဲ နာကျင်ပြီး၊ အဲဒီနာကျင်မှုက ပုခုံး ဒါမှမဟုတ် လက်ပြင်အထိ ပျံ့နှံ့သွားတာမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 9, 'Is there tenderness or pain when you press or touch the upper right part of your abdomen?', 'ဗိုက်ညာဘက်အပေါ်ပိုင်းကို လက်ဖြင့်ဖိလျှင် သို့မဟုတ် ထိလျှင် နာကျင်မှု (Tenderness) ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 9, 'Do you frequently experience chills or a low-grade fever without a clear reason?', 'သင့်တွင် အကြောင်းရင်းမရှိဘဲ ချမ်းတုန်ခြင်း သို့မဟုတ် ငွေ့ငွေ့ဖျားခြင်းမျိုး မကြာခဏ ဖြစ်တတ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 9, 'Do you experience excessive bloating, gas, or frequent burping after meals?', 'အစားစားပြီးနောက် အလွန်အမင်း လေပွခြင်း၊ လေထိုးခြင်း သို့မဟုတ် မကြာခဏ လေတက်ခြင်းမျိုး ဖြစ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 9, 'Do you have a history of yo-yo dieting?', 'ကိုယ်အလေးချိန် ခဏခဏ ကျလိုက်၊ ပြန်တက်လိုက် ဖြစ်နေသူ (Yo-Yo Dieting) ဖြစ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 9, 'Do you experience unexplained anxiety or restlessness in your limbs (restless legs) at night?', 'ညဘက်တွင် အကြောင်းရင်းမရှိဘဲ စိုးရိမ်စိတ်များခြင်း (Anxiety) သို့မဟုတ် ခြေလက်များ ဂနာမငြိမ်ဖြစ်ခြင်းမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 9, 'Do you feel extremely sleepy during the day but find it difficult to sleep well at night?', 'နေ့ခင်းဘက်တွင် အလွန်အမင်း အိပ်ငိုက်သော်လည်း ညဘက်တွင် ကောင်းစွာ အိပ်မပျော်ဘဲ ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 9, 'Do you feel an unusual, persistent burning sensation in the palms of your hands or the soles of your feet?', 'သင့်လက်ဖဝါး၊ ခြေဖဝါးများတွင် ပုံမှန်မဟုတ်ဘဲ အမြဲတမ်း ပူလောင်နေတတ်ပါသလား။', 'single', 1, NOW(), NOW());

-- Pancreas Questions (organ_id = 10) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 10, 'Do you have pain or discomfort in your upper belly or back today?', 'ဒီနေ့ ခါးနောက်၊ အပေါ်ပတ်အစာအိမ်ပတ်လည် နာကျင်မှု ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 10, 'Do you feel nauseous or have you vomited today?', 'ဒီနေ့ ပျို့အန်ချင်ခြင်း သို့မဟုတ် အန်ခဲ့ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 10, 'Have you noticed oily, pale, or unusually smelly stools today?', 'ဒီနေ့ အဆီများသော၊ အရောင်ဖျော့သော သို့မဟုတ် ပုံမှန်မဟုတ်ဘဲ အနံ့ဆိုးသော ဝမ်းမျိုး သတိထားမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 10, 'Have you experienced a loss of appetite today?', 'ဒီနေ့ အစာစားချင်စိတ် လျော့နည်းသွားပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 10, 'Have you noticed sudden weight loss recently?', 'လတ်တလောမှာ ရုတ်တရက် ကိုယ်အလေးချိန် လျော့နည်းသွားတာကို တွေ့ရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 10, 'Do you feel unusually tired, dizzy, or have symptoms like high thirst or frequent urination?', 'ပုံမှန်မဟုတ်ဘဲ ပင်ပန်းနွမ်းနယ်ခြင်း၊ ခေါင်းမူးခြင်း၊ ရေအလွန်အမင်းမွတ်ခြင်း သို့မဟုတ် မကြာခဏ ဆီးသွားခြင်းမျိုး ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 10, 'Have you noticed yellowing of your skin or eyes?', 'အသားအရေ သို့မဟုတ် မျက်လုံး အဝါရောင် ဖြစ်နေခြင်းကို တွေ့ရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 10, 'Do you have a fever or feel unusually cold today?', 'ဒီနေ့ ဖျားခြင်း သို့မဟုတ် ပုံမှန်မဟုတ်ဘဲ ချမ်းတုန်ခြင်း ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 10, 'Do you feel pain or discomfort after eating fatty meals?', 'အဆီများသော အစားအစာ စားပြီးနောက် နာကျင်မှု သို့မဟုတ် မအီမသာ ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 10, 'Do you have bloating, gas, or frequent diarrhea today?', 'ဒီနေ့ ဗိုက်ဖောင်းခြင်း၊ လေပွခြင်း သို့မဟုတ် မကြာခဏ ဝမ်းလျှောခြင်း ရှိပါသလား။', 'single', 1, NOW(), NOW());

-- Skin Care Questions (organ_id = 11) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 11, 'Do you have dry skin or patches?', 'အရေပြား ခြောက်သွေ့ပြီး စက်တွေဖြစ်နေလား။', 'single', 1, NOW(), NOW()),

('Symptom', 11, 'Are you getting any new acne or breakouts?', 'ဝက်ခြံအသစ်တွေ ထွက်လာလား။', 'single', 1, NOW(), NOW()),

('Symptom', 11, 'Are any red spots appearing on your skin?', 'အရေပြားပေါ်မှာ အနီစက်လေးတွေ ပေါ်လာလား။', 'single', 1, NOW(), NOW()),

('Symptom', 11, 'Do you have any swelling or puffy areas on your face?', 'မျက်နှာမှာ ဖောင်းကြွနေတဲ့နေရာရှိလား။', 'single', 1, NOW(), NOW()),

('Symptom', 11, 'Do you feel any pain or tenderness when touching your skin?', 'အရေပြားကို ကိုင်လိုက်ရင် နာကျင်မှု ရှိလား။', 'single', 1, NOW(), NOW()),

('Symptom', 11, 'Is your skin color changing abnormally?', 'အရေပြားအရောင် ပုံမှန်မဟုတ်ပဲ ပြောင်းလဲနေလား။', 'single', 1, NOW(), NOW()),

('Symptom', 11, 'Are any new spots appearing on areas exposed to the sun?', 'နေရောင်နဲ့ထိတဲ့နေရာတွေမှာ အစက်အပြောက်အသစ်တွေ ပေါ်လာလား။', 'single', 1, NOW(), NOW());

-- Bladder Questions (organ_id = 12) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 12, 'Have you noticed any blood or sediment in your urine?', 'ဆီးထဲ သွေးပါတာ ဒါမှမဟုတ် အနည်ထိုင်တာ မြင်မိခဲ့လား။', 'single', 1, NOW(), NOW()),

('Symptom', 12, 'Have you experienced any urinary incontinence or leaking?', 'ဆီးမထိန်းနိုင်တာ ဒါမှမဟုတ် ဆီးထွက်ကျတာမျိုး ဖြစ်ဖူးလား။', 'single', 1, NOW(), NOW()),

('Symptom', 12, 'Does your urine have a stronger smell than usual?', 'ဆီးအနံ့ ပုံမှန်ထက် ပြင်းထန်နေသလို ခံစားရလား။', 'single', 1, NOW(), NOW()),

('Symptom', 12, 'Do you feel like your bladder isn''t empty after urinating, or do you still feel the urge to go?', 'ဆီးသွားပြီးရင် ဆီးမပြီးသေးသလို၊ ထပ်သွားချင်စိတ် ဆက်ရှိနေလား။', 'single', 1, NOW(), NOW()),

('Symptom', 12, 'Do you feel any pain or pressure in your lower abdomen (bladder area)?', 'ဗိုက်အောက်ပိုင်း (ဆီးအိမ်နေရာ) မှာ နာကျင် ဒါမှမဟုတ် ဖိအားခံစားရလား။', 'single', 1, NOW(), NOW());

-- Blood Vessels Questions (organ_id = 13) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 13, 'Does this chest discomfort spread to your jaw, neck, shoulder, back, or arm?', 'ထိုသို့ ရင်ဘတ်မသက်မသာဖြစ်မှုသည် မေးရိုး၊ လည်ပင်း၊ ပုခုံး၊ ကျော သို့မဟုတ် လက်မောင်းများဆီသို့ ပျံ့နှံ့သွားတတ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 13, 'Do you get unusually short of breath when walking or climbing stairs?', 'လမ်းလျှောက်သည့်အခါ သို့မဟုတ် လှေကားတက်သည့်အခါ ပုံမှန်ထက်ပို၍ မောခြင်း (သို့မဟုတ်) အသက်ရှူရခက်ခြင်း ဖြစ်ပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 13, 'Have you had cold sweats or nausea along with chest discomfort?', 'ရင်ဘတ်မသက်မသာဖြစ်ခြင်းနှင့်အတူ ချွေးစေးများထွက်ခြင်း သို့မဟုတ် ပျို့အန်ချင်ခြင်းများ ဖြစ်ဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 13, 'Have you had sudden numbness or weakness on one side of your face or body?', 'မျက်နှာ သို့မဟုတ် ခန္ဓာကိုယ်၏ တစ်ခြမ်းတည်းတွင် ရုတ်တရက် ထုံကျဉ်ခြင်း သို့မဟုတ် အားနည်းသွားခြင်းမျိုး ရှိဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 13, 'Have you suddenly had trouble speaking or understanding speech?', 'စကားပြောရန် ခက်ခဲခြင်း သို့မဟုတ် သူတစ်ပါးပြောသည့်စကားကို နားလည်ရန် ခက်ခဲခြင်းများ ရုတ်တရက် ဖြစ်ဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 13, 'Have you experienced sudden vision loss or blurriness in one or both eyes?', 'မျက်စိတစ်ဖက် (သို့မဟုတ်) နှစ်ဖက်စလုံးတွင် ရုတ်တရက် အမြင်ကွယ်သွားခြင်း သို့မဟုတ် အမြင်ဝေဝါးသွားခြင်းများ ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 13, 'Have you had sudden dizziness, loss of balance, or coordination problems?', 'ရုတ်တရက် မူးဝေခြင်း၊ ဟန်ချက်မထိန်းနိုင်ခြင်း သို့မဟုတ် ခန္ဓာကိုယ်လှုပ်ရှားမှုကို မထိန်းချုပ်နိုင်ခြင်းများ ဖြစ်ဖူးပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 13, 'Have you had the worst headache of your life with no known cause?', 'အကြောင်းရင်းမရှိဘဲ သင့်တစ်သက်တာတွင် အပြင်းထန်ဆုံးဟု ဆိုရမည့် ခေါင်းကိုက်ဝေဒနာမျိုး ခံစားရဖူးပါသလား။', 'single', 1, NOW(), NOW());


-- Bones Questions (organ_id = 14) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 14, 'Do you have any bone pain? (e.g., in your hip or spine)', 'အရိုးတစ်နေရာရာမှာ နာကျင်မှု ရှိပါသလား။ (ဥပမာ- ပေါင်ရိုး၊ ခါးရိုး)', 'single', 1, NOW(), NOW()),

('Symptom', 14, 'Do you feel that your posture (slouching or hunched shoulders) is getting worse?', 'ကိုယ်နေဟန်ထား (ခါးကိုင်း၊ ပခုံးကုန်း) ပိုဆိုးလာသလို ခံစားရလား။', 'single', 1, NOW(), NOW()),

('Symptom', 14, 'Do you feel like your bones break easily? (Even with minor impact)', 'အရိုးကျိုးလွယ်တယ်လို့ ထင်မိလား။ (အနည်းငယ်ထိခိုက်ရုံနှင့်)', 'single', 1, NOW(), NOW()),

('Symptom', 14, 'Are your joints swollen?', 'အဆစ်အမြစ်တွေ ရောင်ရမ်းနေလား။', 'single', 1, NOW(), NOW()),

('Symptom', 14, 'Do you have pain near your waist, just below the ribs? (A possible sign of osteoporosis)', 'နံရိုးအောက်ဘက် ခါးနားမှာ နာကျင်မှု ရှိလား။ (အရိုးပွရောဂါလက္ခဏာ)', 'single', 1, NOW(), NOW()),

('Symptom', 14, 'Do you feel like your fingers are getting shorter or starting to curve/bend?', 'လက်ချောင်းလေးတွေ တိုလာသလို၊ ကွေးညောင်းလာသလို ခံစားရလား။', 'single', 1, NOW(), NOW()),

('Symptom', 14, 'Do you frequently experience pain in major joints like the knees or hips?', 'ဒူးခေါင်း၊ ခါး စတဲ့ အဆစ်ကြီးတွေမှာ မကြာခဏ နာကျင်ကိုက်ခဲမှု ရှိလား။', 'single', 1, NOW(), NOW());

-- Male Reproductive System Questions (organ_id = 15) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 15, 'Have you noticed a lump, swelling, or size change in either testicle?', 'ကပ်ပယ်အိတ်တစ်ဖက်ဖက်တွင် အကျိတ်ရှိခြင်း၊ ရောင်ရမ်းခြင်း သို့မဟုတ် အရွယ်အစားပြောင်းလဲခြင်းများကို သတိပြုမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 15, 'Do your testicles feel heavy or achy?', 'သင့်ကပ်ပယ်အိတ်ထဲတွင် လေးလံခြင်း သို့မဟုတ် ကိုက်ခဲခြင်း ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 15, 'Have you noticed pain in your groin area?', 'သင့်ပေါင်ခြံတစ်ဝိုက်တွင် နာကျင်မှုကို သတိပြုမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 15, 'Have you noticed blood in your urine or semen?', 'ဆီး သို့မဟုတ် သုတ်ရည်တွင် သွေးပါသည်ကို သတိပြုမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 15, 'Have you experienced difficulty getting or keeping an erection, or noticed that your penis is curved or painful when erect?', 'လိင်တံတောင့်တင်းရန် ခက်ခဲခြင်း (သို့မဟုတ်) ဆက်လက်တောင့်တင်းနေစေရန် ခက်ခဲခြင်း ခံစားရပါသလား? သို့မဟုတ် လိင်တံတောင့်တင်းချိန်တွင် ကောက်နေခြင်း သို့မဟုတ် နာကျင်ခြင်းများ ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 15, 'Have you noticed a decrease in your sexual desire?', 'သင့်တွင် လိင်စိတ်ဆန္ဒ လျော့နည်းသွားသည်ကို သတိပြုမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 15, 'Do you experience pain during or after ejaculation?', 'သုတ်လွှတ်စဉ် သို့မဟုတ် သုတ်လွှတ်ပြီးနောက်တွင် နာကျင်မှုကို ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 15, 'Have you noticed breast enlargement or tenderness?', 'ရင်သားကြီးလာခြင်း သို့မဟုတ် ရင်သားနာကျင်ထိခိုက်လွယ်ခြင်းများကို သတိပြုမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 15, 'Have you and your partner been unable to conceive after one year of trying?', 'သင်နှင့် သင့်အဖော်သည် ကလေးယူရန် တစ်နှစ်ခန့် ကြိုးစားသော်လည်း ကိုယ်ဝန်မရရှိဘဲ ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW());

-- Female Reproductive System Questions (organ_id = 16) - All Symptom
INSERT INTO `questions` (`category_type`, `organ_id`, `question_text_en`, `question_text_mm`, `question_type`, `is_active`, `created_at`, `updated_at`) VALUES
('Symptom', 16, 'Are your periods so heavy that you soak through pads/tampons every 1–2 hours?', 'သင်သည် ရာသီသွေးဆင်းချိန်တွင် ၁ နာရီ သို့မဟုတ် ၂ နာရီခြားတစ်ခါ လဲလှယ်ရလောက်အောင် သွေးအလွန်အကျွံ ဆင်းပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Do you experience severe menstrual symptoms—such as strong cramping, mood swings, bloating, or breast pain—that interfere with your daily activities?', 'သင်သည် ရာသီလာချိန်တွင် နေ့စဉ်လုပ်ငန်းဆောင်တာများကို အနှောင့်အယှက်ဖြစ်စေလောက်သည့် ပြင်းထန်သော လက္ခဏာများ—ဥပမာ ဗိုက်အလွန်အမင်းအောင့်ခြင်း၊ စိတ်အပြောင်းအလဲမြန်ခြင်း၊ ဗိုက်ပွခြင်း သို့မဟုတ် ရင်သားနာကျင်ခြင်း—ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Is your menstrual cycle irregular (shorter than 21 days or longer than 35 days)?', 'သင့်၏ ရာသီစက်ဝန်းမှာ ပုံမှန်မဟုတ်ဘဲ (၂၁ ရက်ထက်တိုခြင်း သို့မဟုတ် ၃၅ ရက်ထက်ရှည်ခြင်း) ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Do you bleed between periods or after sex?', 'ရာသီလာချိန်မဟုတ်ဘဲ ကြားရက်များတွင် သွေးဆင်းခြင်း သို့မဟုတ် လိင်ဆက်ဆံပြီးနောက် သွေးဆင်းခြင်းရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Do you have chronic lower abdominal or pelvic pain?', 'သင့်တွင် နာတာရှည် ဗိုက်အောက်ပိုင်း သို့မဟုတ် တင်ပါးဆုံတွင်းပိုင်း နာကျင်ကိုက်ခဲမှု ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Do you experience pain during or after sexual intercourse, bowel movements, or urination?', 'လိင်ဆက်ဆံစဉ် (သို့) ဆက်ဆံပြီးချိန်၊ ဝမ်းသွားချိန် သို့မဟုတ် ဆီးသွားချိန်များတွင် နာကျင်မှု ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Do you have unusual vaginal discharge (color, smell, or amount)?', 'ပုံမှန်မဟုတ်သော မိန်းမကိုယ်မှအဆင်းအရည်များ (အရောင်၊ အနံ့ သို့မဟုတ် ပမာဏ) ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Do you experience itching, burning, or irritation in the vaginal area?', 'မိန်းမကိုယ်တစ်ဝိုက်တွင် ယားယံခြင်း၊ ပူစပ်ပူလောင်ဖြစ်ခြင်း သို့မဟုတ် တစ်ခုခုဖြစ်နေသကဲ့သို့ ခံစားရခြင်းရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Do you experience vaginal dryness during sex?', 'လိင်ဆက်ဆံစဉ် မိန်းမကိုယ် ခြောက်သွေ့ခြင်း ခံစားရပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Have you noticed sores, bumps, or growths in the genital area?', 'လိင်အင်္ဂါစပ်တစ်ဝိုက်တွင် အနာများ၊ အဖုအကျိတ်များ သို့မဟုတ် အသားပိုများ ထွက်လာသည်ကို သတိပြုမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Do you experience hot flashes or night sweats?', 'ကိုယ်ခန္ဓာ အပူချိန်ရုတ်တရက်မြင့်တက်ခြင်း သို့မဟုတ် ညဘက်တွင် ချွေးထွက်ခြင်းများ ရှိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Do you have trouble sleeping through the night?', 'ညဘက်တွင် နှစ်ခြိုက်စွာ အိပ်ပျော်ရန် ခက်ခဲပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Have you noticed changes in mood, memory, or concentration?', 'စိတ်အခြေအနေ၊ မှတ်ဉာဏ် သို့မဟုတ် အာရုံစူးစိုက်မှုဆိုင်ရာ အပြောင်းအလဲများ ရှိနေသည်ဟု သတိပြုမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Have you gained weight, especially around your abdomen?', 'အထူးသဖြင့် ဗိုက်တစ်ဝိုက်တွင် ကိုယ်အလေးချိန် တိုးလာပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Have you noticed increased facial hair or thinning scalp hair?', 'မျက်နှာတွင် အမွှေးအမျှင်များ ပိုထွက်လာခြင်း သို့မဟုတ် ဦးရေပြားမှ ဆံပင်များ ပါးလာခြင်းကို သတိပြုမိပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Has your interest in sex decreased significantly?', 'လိင်ကိစ္စအပေါ် စိတ်ဝင်စားမှု သိသိသာသာ လျော့နည်းသွားပါသလား။', 'single', 1, NOW(), NOW()),

('Symptom', 16, 'Have you and your partner been unable to conceive after one year of trying?', 'သင်နှင့် သင့်အဖော်သည် ကလေးယူရန် တစ်နှစ်ခန့် ကြိုးစားသော်လည်း ကိုယ်ဝန်မရရှိဘဲ ဖြစ်နေပါသလား။', 'single', 1, NOW(), NOW());