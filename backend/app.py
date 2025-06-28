from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

staff_data = [
    {
        "id": 1,
        "email": "lucy.chen@university.edu",
        "jobTitle": "Senior Lecturer",
        "researchArea": "Human-Computer Interaction"
    },
    {
        "id": 2,
        "email": "matthew.wong@university.edu",
        "jobTitle": "Associate Professor",
        "researchArea": "Cybersecurity"
    },
    {
        "id": 3,
        "email": "nina.takahashi@university.edu",
        "jobTitle": "Postdoctoral Researcher",
        "researchArea": "Natural Language Processing"
    },
    {
        "id": 4,
        "email": "daniel.owens@university.edu",
        "jobTitle": "Research Fellow",
        "researchArea": "Data Visualization"
    },
    {
        "id": 5,
        "email": "sophia.ramirez@university.edu",
        "jobTitle": "Lecturer",
        "researchArea": "Educational Technology"
    },
{
        "id": 6,
        "email": "karen.bennett@university.edu",
        "jobTitle": "Associate Lecturer",
        "researchArea": "Computer Graphics"
    },
    {
        "id": 7,
        "email": "amir.qureshi@university.edu",
        "jobTitle": "Senior Research Fellow",
        "researchArea": "Robotics and Automation"
    },
    {
        "id": 8,
        "email": "julien.moreau@university.edu",
        "jobTitle": "Visiting Professor",
        "researchArea": "Digital Humanities"
    },
    {
        "id": 9,
        "email": "meilin.zhao@university.edu",
        "jobTitle": "Lecturer",
        "researchArea": "AR/VR in Education"
    },
    {
        "id": 10,
        "email": "ricardo.mendez@university.edu",
        "jobTitle": "Research Associate",
        "researchArea": "Computational Biology"
    }
]



@app.route('/staff')
def get_all_staff():
    area = request.args.get('area')
    if area:
        filtered = [s for s in staff_data if s["researchArea"].lower() == area.lower()]
        return jsonify(filtered)
    return jsonify(staff_data)


@app.route('/staff/<int:staff_id>')
def get_staff_by_id(staff_id):
    for staff in staff_data:
        if staff["id"] == staff_id:
            return jsonify(staff)
    return jsonify({"error": "Staff not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)
