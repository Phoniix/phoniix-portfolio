# Projects Management Guide

This guide explains how to add, edit, and remove projects from your portfolio.

## Two Ways to Manage Projects

### Option 1: Web Admin Interface (Recommended) 🌐
Navigate to `http://localhost:8080/#/projects-admin` to use the visual admin panel.

### Option 2: Manual JSON Editing 📝
Edit the JSON file directly at:
```
src/main/resources/static/data/projects.json
```

---

# Using the Admin Interface

## Quick Start

1. **Navigate** to `http://localhost:8080/#/projects-admin`
2. **Click "Add Project"** to create a new project
3. **Fill in the form** with your project details
4. **Upload an image** (drag & drop or click to browse)
5. **Save** the project
6. **Download images** from the "Images to Download" section
7. **Place images** in `src/main/resources/static/images/projects/`
8. **Export JSON** when done editing
9. **Replace** old `projects.json` with downloaded file
10. **Refresh** your projects page to see changes!

## Admin Features

### 📋 Project List
- View all projects with thumbnails
- See display order, technology count, and publish status
- Quick edit/delete buttons

### ➕ Add New Project
- Click "Add Project" button
- Fill in all required fields (title, description, technologies)
- Upload image or leave blank for placeholder
- Set display order (lower numbers appear first)
- Toggle published status

### ✏️ Edit Existing Project
- Click "Edit" on any project card
- Modify any fields
- Upload new image or keep existing
- Save changes

### 🗑️ Delete Project
- Click "Delete" on project card
- Confirm deletion
- Project removed from list

### 📤 Export/Import JSON
- **Export**: Downloads `projects.json` with all current projects
- **Import**: Upload existing `projects.json` to continue editing

### 🖼️ Image Management
- **Upload**: Drag & drop or click to upload images
- **Preview**: See image before saving
- **Download**: Individual download buttons per image
- **Bulk Download**: Download all images at once
- Images stored temporarily until you download them

## Workflow Example

```
1. Open admin page: http://localhost:8080/#/projects-admin
2. Click "Add Project"
3. Enter:
   - Title: "My Awesome App"
   - Description: "A cool application..."
   - Technologies: "React, Node.js, MongoDB"
   - Upload image: awesome-app.jpg
4. Click "Save Project"
5. In "Images to Download" section, click "Download" for awesome-app.jpg
6. Copy downloaded image to: src/main/resources/static/images/projects/
7. Add more projects or edit existing ones
8. When done, click "Export JSON"
9. Replace old projects.json with downloaded file:
   src/main/resources/static/data/projects.json
10. Refresh projects page - done! ✨
```

---

# Manual JSON Editing

## Project Structure

Each project in the JSON file has the following fields:

```json
{
  "id": 1,
  "title": "Project Title",
  "description": "Detailed description of your project",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "imageUrl": "/images/projects/image.jpg",
  "liveUrl": "https://live-demo.com",
  "codeUrl": "https://github.com/username/repo",
  "displayOrder": 1,
  "published": true
}
```

### Field Descriptions

- **id** (required): Unique identifier for the project
- **title** (required): Project name
- **description** (required): Brief description of the project
- **technologies** (required): Array of technologies used
- **imageUrl** (optional): Path to project image (relative to static folder)
- **liveUrl** (optional): URL to live demo (set to `null` if none)
- **codeUrl** (optional): URL to source code repository
- **displayOrder** (required): Controls the order projects appear (lower numbers first)
- **published** (required): `true` to show, `false` to hide

## How to Add a New Project

### Step 1: Add Project Image
1. Place your project image in `src/main/resources/static/images/projects/`
2. Use a descriptive filename like `my-awesome-project.jpg`

### Step 2: Update JSON File
Open `src/main/resources/static/data/projects.json` and add a new project object:

```json
{
  "id": 7,
  "title": "My Awesome Project",
  "description": "This project does amazing things with modern technology.",
  "technologies": ["React", "TypeScript", "Node.js"],
  "imageUrl": "/images/projects/my-awesome-project.jpg",
  "liveUrl": "https://my-project.com",
  "codeUrl": "https://github.com/myusername/my-project",
  "displayOrder": 7,
  "published": true
}
```

### Step 3: Rebuild and Test
1. If using Maven: `mvn clean install`
2. Run your application
3. Navigate to the Projects page to see your new project

## How to Edit an Existing Project

1. Open `projects.json`
2. Find the project by its `id`
3. Edit any fields you want to update
4. Save the file
5. Refresh your browser

## How to Remove a Project

### Option 1: Hide it (Recommended)
Set `"published": false` to hide the project without deleting it:

```json
{
  "id": 3,
  "title": "Old Project",
  ...
  "published": false
}
```

### Option 2: Delete it permanently
Remove the entire project object from the JSON array.

## How to Reorder Projects

Change the `displayOrder` values. Projects with lower numbers appear first:

```json
{
  "id": 5,
  "displayOrder": 1  // This appears first
}
{
  "id": 2,
  "displayOrder": 2  // This appears second
}
```

## Features

### Search & Filter
Your projects page includes:
- **Search bar**: Searches titles, descriptions, and technologies
- **Technology filter**: Dropdown to filter by specific technology
- **Results counter**: Shows how many projects match your filters

### Automatic Features
- Projects without images show a placeholder emoji (🚀)
- Links are only displayed if URLs are provided
- XSS protection with HTML escaping
- Responsive design for mobile devices
- Smooth fade-in animations

## Example: Complete Project Entry

```json
{
  "id": 8,
  "title": "Portfolio Website",
  "description": "A modern, responsive portfolio website built with Spring Boot and vanilla JavaScript featuring a 3D logo, smooth animations, and dark mode support.",
  "technologies": ["Spring Boot", "JavaScript", "Three.js", "CSS3"],
  "imageUrl": "/images/projects/portfolio.jpg",
  "liveUrl": "https://myportfolio.com",
  "codeUrl": "https://github.com/username/portfolio",
  "displayOrder": 1,
  "published": true
}
```

## Tips

- Use high-quality images (recommended: 800x600px or 1200x900px)
- Keep descriptions concise but informative (2-3 sentences)
- List 3-5 key technologies per project
- Update `displayOrder` to feature your best work first
- Test on mobile devices to ensure images look good

## Troubleshooting

**Problem**: Projects not showing up
- Check that `published` is set to `true`
- Verify JSON syntax is valid (no missing commas or brackets)
- Check browser console for errors

**Problem**: Images not loading
- Verify image path is correct: `/images/projects/filename.jpg`
- Check that image exists in the correct folder
- Ensure image filename matches exactly (case-sensitive on some systems)

**Problem**: Filter not working
- Clear browser cache and refresh
- Check browser console for JavaScript errors

## Need Help?

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Validate your JSON at https://jsonlint.com/
3. Ensure all required fields are present in each project

---

Happy showcasing your projects! 🚀

