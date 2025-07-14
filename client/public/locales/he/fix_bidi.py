import json
import re

input_file = "translation.json"
output_file = "translation_fixed.json"
LRM = "\u200E"

def fix_mixed_direction(text):
    def wrap_english(match):
        return f"{LRM}{match.group(0)}{LRM}"
    return re.sub(r'\b[\w\-/.@]+\b', wrap_english, text)

with open(input_file, "r", encoding="utf-8") as f:
    translations = json.load(f)

fixed = {}
for key, value in translations.items():
    if isinstance(value, str):
        fixed[key] = fix_mixed_direction(value)
    elif isinstance(value, list):
        fixed[key] = [fix_mixed_direction(item) if isinstance(item, str) else item for item in value]
    elif isinstance(value, dict):
        fixed[key] = {
            subkey: fix_mixed_direction(subvalue) if isinstance(subvalue, str) else subvalue
            for subkey, subvalue in value.items()
        }
    else:
        fixed[key] = value

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(fixed, f, ensure_ascii=False, indent=2)

print("✅ translation_fixed.json נוצר בהצלחה")
