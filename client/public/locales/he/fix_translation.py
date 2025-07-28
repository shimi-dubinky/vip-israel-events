import json
import re

input_file = "translation.json"
output_file = "translation_fixed.json"
LRM = "\u200E"  # Left-to-Right Mark

def fix_mixed_direction(text):
    # הסרת תווי LTR marks מיותרים שגורמים לרווחים
    text = text.replace("‎", "")
    
    def wrap_english(match):
        return f"{LRM}{match.group(0)}{LRM}"
    
    # עטיפת טקסטים באנגלית/מספרים/שמות קבצים וכו'
    text = re.sub(r'\b[A-Za-z0-9\-/.@]+\b', wrap_english, text)
    
    # תיקון פסיקים בעברית:
    # מסיר רווחים לפני פסיק
    text = re.sub(r'\s+,', ',', text)
    
    # מוסיף רווח אחרי פסיק אם חסר
    text = re.sub(r',(?=\S)', ', ', text)
    
    # תיקון רווחים מרובים
    text = re.sub(r'\s{2,}', ' ', text)
    
    # ניקוי רווחים בתחילת ובסוף
    text = text.strip()

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
    "‎‎‎E.M.T‎‎‎ ‎‎‎VIP‎‎‎",
    "‎‎‎חווית‎‎‎ ‎‎‎המורשת‎‎‎ ‎‎‎שלכם‎‎‎ ‎‎‎בישראל‎‎‎, ‎‎‎במלאכת‎‎‎",
    "‎‎‎A.M.T‎‎‎ ‎‎‎VIP‎‎‎‏ - ‎‎‎הפקת‎‎‎",
    "‎‎‎שירותי‎‎‎ ‎‎‎קונסיירז‎‎‎' ‎‎‎ו-VIP‎‎‎‏"
]

for test in test_strings:
    fixed = fix_mixed_direction(test)
    print(f"לפני: '{test}'")
    print(f"אחרי: '{fixed}'")
    print("---")