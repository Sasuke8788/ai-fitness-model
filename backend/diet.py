def calculate_bmi(weight, height):
    weight = float(weight)
    height = float(height)

    height_m = height / 100
    bmi = weight / (height_m ** 2)
    return round(bmi, 2)


def calorie_recommendation(weight, height, age, goal):
    weight = float(weight)
    height = float(height)
    age = float(age)

    bmr = 10 * weight + 6.25 * height - 5 * age + 5

    if goal == "loss":
        return int(bmr - 400)
    elif goal == "gain":
        return int(bmr + 400)
    else:
        return int(bmr)


def bmi_category(bmi):
    if bmi < 18.5:
        return "underweight"
    if bmi < 25:
        return "normal"
    if bmi < 30:
        return "overweight"
    return "obese"


def macro_recommendation(calories, goal):
    if goal == "gain":
        protein_ratio, carb_ratio, fat_ratio = 0.30, 0.45, 0.25
    elif goal == "loss":
        protein_ratio, carb_ratio, fat_ratio = 0.35, 0.35, 0.30
    else:
        protein_ratio, carb_ratio, fat_ratio = 0.30, 0.40, 0.30

    protein_g = int((calories * protein_ratio) / 4)
    carbs_g = int((calories * carb_ratio) / 4)
    fats_g = int((calories * fat_ratio) / 9)

    return {
        "protein_g": protein_g,
        "carbs_g": carbs_g,
        "fats_g": fats_g,
    }


def build_diet_recommendation(weight, height, age, goal):
    bmi = calculate_bmi(weight, height)
    calories = calorie_recommendation(weight, height, age, goal)
    return {
        "bmi": bmi,
        "bmi_category": bmi_category(bmi),
        "calories": calories,
        "macros": macro_recommendation(calories, goal),
    }
