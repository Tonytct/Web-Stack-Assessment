# Staff Directory API Documentation

This document describes the available endpoints for the Staff Directory application.

Base URL: `http://127.0.0.1:5000`

---

### 1. `GET /staff`

**Description:**  
Returns a list of all staff members with basic information like email, job title, and research area.

**Optional Query Parameters:**
- `area`: Filter results by research area

**Example Requests:**
```http
GET /staff
GET /staff?area=Human-Computer
```


**Success Response (200 OK):**
```json
[
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
  ...
]

```

### 2. `GET /staff/<id>`
**Description:**  
Returns details for a specific staff member based on their ID.

**Optional Query Parameters:**
- `id`: Integer, the unique ID of the staff member

**Example Requests:**
```http
GET /staff/3
```


**Success Response (200 OK):**
```json
{
  "id": 3,
  "email": "nina.takahashi@university.edu",
  "jobTitle": "Postdoctoral Researcher",
  "researchArea": "Natural Language Processing"
}

```

**Error Response (404 Not Found):**
```json
{
  "error": "Staff not found"
}
```

