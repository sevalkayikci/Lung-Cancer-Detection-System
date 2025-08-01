
from flask import Flask, request, jsonify
from ultralytics import YOLO
from PIL import Image
from datetime import datetime
import cv2
import os

app = Flask(__name__)

# create necessary directories
os.makedirs("uploads", exist_ok=True)
desktop_scan_path = os.path.join(os.path.expanduser("~"), "Desktop", "LungScans")
os.makedirs(desktop_scan_path, exist_ok=True)


print("importing yolo...")
model = YOLO("best.pt")
print("IMPORTED YOLO MODEL")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    image_path = data.get("imagePath")
    print("path:", image_path)

    if not os.path.exists(image_path):
        print("No file:", image_path)
        return jsonify({ "error": "No scan found!" }), 400

    try:
        results = model(image_path)
        result = results[0]
        boxes = result.boxes

        # confidence score
        confidence = round(float(boxes[0].conf[0]), 2) if len(boxes) > 0 else 0.0

        # folder information
        raw_filename = os.path.basename(image_path)
        patient_id = os.path.splitext(raw_filename)[0]
        folder_name = f"Patient_{patient_id}"
        save_folder = os.path.join(desktop_scan_path, folder_name)
        os.makedirs(save_folder, exist_ok=True)

        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        filename = f"{patient_id}_{timestamp}.jpg"
        output_path = os.path.join(save_folder, filename)

        # read the image using OpenCV
        img = cv2.imread(image_path)

        # draw bounding boxes on the image
        if len(boxes) > 0:
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                conf = float(box.conf[0])
                cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
                label = f"{conf:.2f}"
                cv2.putText(img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

        # save even there is no cancer detected
        cv2.imwrite(output_path, img)
        print("Saved to:", output_path)

        return jsonify({
            "confidence": confidence,
            "outputPath": output_path
        })

    except Exception as e:
        print("Prediction error:", str(e))
        return jsonify({ "error": "Prediction failed", "details": str(e) }), 500

if __name__ == '__main__':
    print("stating the app...")
    app.run(port=5001, debug=True)
