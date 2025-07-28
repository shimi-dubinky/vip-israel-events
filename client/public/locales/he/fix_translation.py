import json
import re

input_file = "translation.json"
output_file = "translation_fixed.json"
LRM = "\u200E"

def fix_mixed_direction(text):
    def wrap_english(match):
        return f"{LRM}{match.group(0)}{LRM}"
    
    # עטיפת טקסטים באנגלית/מספרים/שמות קבצים וכו'
    text = re.sub(r'\b[\w\-/.@]+\b', wrap_english, text)

    # תיקון פסיקים - עברית:
    # בעברית הפסיק צריך להדבק למילה שלפניו ולא לזו שאחריו
    # מסיר רווחים לפני פסיק (בעיה עיקרית)
    text = re.sub(r'\s+,', ',', text)
    
    # מוסיף רווח אחרי פסיק אם חסר (רק אם יש תו אחרי הפסיק שלא רווח)
    text = re.sub(r',(?=\S)', ', ', text)
    
    # תיקון נוסף: מטפל במקרים של פסיקים שכבר יש אחריהם רווח אבל יותר מדי
    text = re.sub(r',\s{2,}', ', ', text)

    return text

def fix_values(obj):
    if isinstance(obj, str):
        return fix_mixed_direction(obj)
    elif isinstance(obj, list):
        return [fix_values(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: fix_values(val) for key, val in obj.items()}
    else:
        return obj

# טעינת הקובץ
with open(input_file, "r", encoding="utf-8") as f:
    translations = json.load(f)

# תיקון התרגומים
fixed_translations = fix_values(translations)

# שמירת הקובץ המתוקן
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(fixed_translations, f, ensure_ascii=False, indent=2)

print("✅ קובץ מתוקן נוצר בהצלחה בשם translation_fixed.json")

# הדפסת דוגמאות לבדיקה
print("\n🔍 דוגמאות לבדיקה:")
test_strings = [
    "מילה ,מילה",
    "טקסט , טקסט נוסף",
    "מילה,מילה",
    "משהו  ,  משהו אחר"
]

for test in test_strings:
    fixed = fix_mixed_direction(test)
    print(f"לפני: '{test}'")
    print(f"אחרי: '{fixed}'")
    print("---")