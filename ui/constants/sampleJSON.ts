export const SAMPLE_JSON = `{
  "user": {
    "id": 12,
    "name": "Aman Yadav",
    "email": "aman.yadav.swe@gmail.com",
    "isActive": true,
    "address": {
      "city": "Bengaluru",
      "country": "India"
    },
    "roles": ["developer", "admin"]
  },
  "project": {
    "name": "JSON Visualizer",
    "version": "1.0.2",
    "isPublic": true
  },
  "stats": {
    "users": 120,
    "active": 95
  }
}`;

export const SAMPLE_JSONS = {
  simple: `{
  "name": "Hello",
  "age": 27,
  "city": "Mumbai"
}`,
  nested: SAMPLE_JSON,
  array: `[
  { "id": 1, "task": "Setup Next.js" },
  { "id": 2, "task": "Add TailwindCSS" },
  { "id": 3, "task": "Build JSON Visualizer" }
]`,
  mixed: `{
  "string": "Hello JSON",
  "number": 42,
  "boolean": true,
  "array": [1, 2, 3],
  "object": { "key": "value" }
}`,
};
