import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

model = load_model('my_model_v2.h5')

class_names = [
    "adhirasam", "aloo_gobi", "aloo_matar", "aloo_methi", "aloo_shimla_mirch", "aloo_tikki","anarsa", "ariselu", "bandar_laddu", "basundi", "bhatura", "bhindi_masala", "biryani",
    "boondi", "butter_chicken", "chak_hao_kheer", "cham_cham", "chana_masala", "chapati",
    "chhena_kheeri", "chicken_razala", "chicken_tikka", "chicken_tikka_masala", "chikki",
    "daal_baati_churma", "daal_puri", "dal_makhani", "dal_tadka", "dharwad_pedha", "doodhpak",
    "double_ka_meetha", "dum_aloo", "gajar_ka_halwa", "gavvalu", "ghevar", "gulab_jamun",
    "imarti", "jalebi", "kachori", "kadai_paneer", "kadhi_pakoda", "kajjikaya", "kakinada_khaja",
    "kalakand", "karela_bharta", "kofta", "kuzhi_paniyaram", "lassi", "ledikeni", "litti_chokha",
    "lyangcha", "maach_jhol", "makki_di_roti_sarson_da_saag", "malapua", "misi_roti",
    "misit_doi", "modak", "mysore_pak", "naan", "navrattan_korma", "palak_paneer",
    "paneer_butter_masala", "phirni", "pithe", "poha", "poornalu", "pootharekulu",
    "qubani_ka_meetha", "rabri", "ras_malai", "rasgulla", "sandesh", "shankarpali",
    "sheer_korma", "sheera", "shrikhand", "sohan_halwa", "sohan_papdi", "sutar_feni",
    "unni_appam"
]

def get_user_rdv(age, gender):
    if age >= 18:
        if gender.lower() == 'male':
            rdv = {'energy_kcal': 2500, 'carb_g': 300, 'protein_g': 56, 'fat_g': 70,
                   'freesugar_g': 50, 'fibre_g': 30}
        elif gender.lower() == 'female':
            rdv = {'energy_kcal': 2000, 'carb_g': 250, 'protein_g': 46, 'fat_g': 70,
                   'freesugar_g': 50, 'fibre_g': 25}
        else:
            rdv = {'energy_kcal': 2000, 'carb_g': 275, 'protein_g': 50, 'fat_g': 70,
                   'freesugar_g': 50, 'fibre_g': 30}
    else:
        rdv = {'energy_kcal': 1800, 'carb_g': 220, 'protein_g': 45, 'fat_g': 60,
               'freesugar_g': 40, 'fibre_g': 20}

    rdv.update({'iron_mg': 8, 'calcium_mg': 1000, 'vitD_ug': 15,
                'vitB12_ug': 2.4, 'folate_ug': 400})
    return rdv

NUTRIENT_DENSE_FOODS = {
    'iron_mg': ['Spinach sambar', 'Keerai poriyal', 'Ragi dosa'],
    'calcium_mg': ['Curd rice', 'Appam with coconut milk', 'Milk pongal'],
    'vitD_ug': ['Egg dosa', 'Paneer dosa', 'Milk pongal'],
    'vitB12_ug': ['Egg dosa', 'Paneer dosa', 'Curd rice'],
    'folate_ug': ['Moong dal dosa', 'Vegetable sambar', 'Ragi dosa']
}


def analyze_food(img_path, food_list, age, gender, significant_fraction=0.25):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    pred = model.predict(img_array)
    pred_class_index = int(np.argmax(pred[0]))
    predicted_food = class_names[pred_class_index]
    probability = float(pred[0, pred_class_index])

    data = pd.read_excel("nutridb.xlsx")
    data.columns = data.columns.str.strip()
    rdv = get_user_rdv(age, gender)
    
    presence = {nutrient: 0 for nutrient in rdv}
    for food in food_list:
        food_lower = food.lower()
        matched_rows = data[data['food_name'].str.lower().str.contains(food_lower, na=False, regex=False)]
        for idx, row in matched_rows.iterrows():
            for nutrient in rdv:
                if nutrient in data.columns and pd.notna(row[nutrient]):
                    if row[nutrient] >= rdv[nutrient] * significant_fraction:
                        presence[nutrient] = max(presence[nutrient], row[nutrient])

    missing_links = {}
    for nutrient, amount in presence.items():
        if amount < rdv[nutrient] * significant_fraction and nutrient in NUTRIENT_DENSE_FOODS:
            missing_links[nutrient] = [f"https://www.swiggy.com/search?query={dish.replace(' ','%20')}"
                                       for dish in NUTRIENT_DENSE_FOODS[nutrient]]

    response = {
        "predicted_food": predicted_food,
        "probability": probability,
        "nutrients_present": presence,
        "missing_nutrients_links": missing_links
    }

    return response


if _name_ == "__main__":
    result = analyze_food(
        img_path="testimg3.jpg",
        food_list=["Bengal 5 Spice Blend (Panch Phoran)", "Green chilli sauce"],
        age=25,
        gender="male"
    )
    print(result)