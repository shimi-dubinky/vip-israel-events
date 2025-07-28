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

    # תיקון פסיקים:
    # - מסיר רווחים לא תקניים לפני פסיק
    # - מוסיף רווח תקני אחרי פסיק אם חסר
    text = re.sub(r'\s+,', ',', text)
    text = re.sub(r',(?=\S)', ', ', text)

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

with open(input_file, "r", encoding="utf-8") as f:
    translations = json.load(f)

fixed_translations = fix_values(translations)

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(fixed_translations, f, ensure_ascii=False, indent=2)

print("✅ קובץ מתוקן נוצר בהצלחה בשם translation_fixed.json")
