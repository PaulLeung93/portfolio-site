# Comprehensive Project Guide: 3D Portfolio

This document is a complete reference for your portfolio project. It covers every file in the codebase and explains the complex "Dual Layer" architecture in detail.

---

## 1. Architecture: The "Dual Layer" Concept

Your application is unique because it renders two completely different worlds on top of each other. Understanding this is key to making changes.

**Layer 1: The Background (3D World)**
*   **What it is:** A `<Canvas>` element filling the entire screen (`z-index: 0`).
*   **What renders here:** The 3D Phone model, the lights, the shadows.
*   **Interactivity:** The user can spin the phone (`OrbitControls`) or fold it (Flip model).
*   **Key Behavior:** This layer is `fixed` or `absolute`, meaning it stays put (or moves slightly) while you scroll the page.

**Layer 2: The Foreground (2D Overlay)**
*   **What it is:** A standard HTML `<div>` with text, buttons, and sections (`z-index: 10`).
*   **What renders here:** "About Me," "Experience," "Blog," Navigation.
*   **Interactivity:** Scrollable. Buttons are clickable (`pointer-events: auto`).
*   **Key Behavior:** This layer sits *on top* of the 3D world. We use `pointer-events-none` on the main container so clicks "pass through" to the 3D phone when not hitting a button.

---

## 2. File-by-File Reference

### Root Directory
*   **`index.html`**: The entry point for the browser. It's a standard HTML shell that loads `src/main.jsx`.
*   **`package.json`**: The manifesto. Lists all libraries (React, Three.js, Framer Motion) and scripts (`dev`, `build`).
*   **`vite.config.js`**: Configuration for Vite (the build tool). It sets the base URL (`/portfolio-site/`) for deployment.
*   **`eslint.config.js`**: Rules for code quality (linting). Ensures you don't leave unused variables.
*   **`postcss.config.js`**: A processor for CSS, required for Tailwind to work.
*   **`.gitignore`**: Tells Git which files to ignore (like `node_modules` or `dist`).

### `src/` (Source Code)
*   **`main.jsx`**: The Javascript entry point. It finds the `#root` div in your HTML and "hydrates" it with the React App.
*   **`App.jsx`**: The Layout Orchestrator.
    *   It sets up the `fixed` background (Animated Gradient).
    *   It renders the `<Overlay>` (Foreground).
    *   It renders the `<Canvas>` (3D Phone).
    *   It manages the shared state `phoneModel` (which phone is currently visible).
*   **`index.css`**: The Global Stylesheet.
    *   Imports **Tailwind CSS**.
    *   Defines custom CSS variables (themes) like `--color-primary`.
    *   Customizes the scrollbar to look sleek.
*   **`App.css`**: *Legacy/Unused.* This is a leftover file from the Vite template. It allows for spinning logos but is not currently used in your design.

### `src/components/ui/` (The 2D Website)
*   **`Overlay.jsx`**: **[CRITICAL FILE]** The main content of your website.
    *   Contains the arrays for `experiences` and `blogs` (CMS-like data).
    *   Defines the sections: Hero, About, Experience, Blog, Contact.
    *   Handles the right-side "Select Device" switcher.
*   **`HomeOS.jsx`**: **[CRITICAL FILE]** The interface *inside* the phone screen.
    *   Simulates an Operating System (Grid of apps).
    *   Contains app logic: `Spotify`, `Photos`, `Settings`, `Dark Mode`, `Language`.
    *   Loads local images for the "Photos" app.
*   **`Header.jsx`**: The top navigation bar ("About", "Work", "Resume"). It animates in on load.
*   **`ScrollDownIndicator.jsx`**: The bouncing arrow at the bottom of the screen. It hides itself when you scroll down to the Resume section.
*   **`AnimatedBackground.jsx`**: A specialized component that draws moving color "blobs" on a 2D canvas behind everything else. This creates the subtle blue/cyan glow.
*   **`translations.js`**: A dictionary file containing all text for the phone's "Language" setting (English, Spanish, French, etc.).

### `src/components/canvas/` (The 3D Objects)
*   **`PhoneModel.jsx`**: **[CRITICAL FILE]** The procedural generator for the 3D phones.
    *   It does **not** load a 3D file (like .obj). It *builds* the phone using code instructions ("Draw a rectangle, round the corners, extrude it").
    *   See below for the deep dive.

---

## 3. Deep Dive: Designing the 3D Phone (The "Layer Cake")

You mentioned struggling with "Layers." In 3D web design (and specifically in your `PhoneModel.jsx`), we construct the phone like a sandwich.

**The Z-Axis is King.**
In 3D, passing things "on top" means moving them along the Z-axis.
*   `Z = 0`: The center of the phone.
*   `Z < 0`: The back of the phone.
*   `Z > 0`: The front (screen) of the phone.

### The Standard Sandwich (iPhone/Pixel)

| Order | Component | Position (Approx) | Description |
| :--- | :--- | :--- | :--- |
| **1. Chassis** | `<mesh>` (Extrude) | `Z = -0.075` | The main metal body. It creates the sleek sides. |
| **2. Back Glass** | `<mesh>` (Shape) | `Z = -0.091` | A flat surface attached to the *back* of cylinder. Rotated to face rear. |
| **3. Cameras** | `<RoundedBox>` | `Z = -0.111` | "Islands" that float *above* the Back Glass. |
| **4. Screen Surface** | `<mesh>` (Shape) | `Z = +0.091` | A flat black surface attached to the *front*. |
| **5. Content Layer** | `<Html>` | `Z = +0.092` | The actual React code (`HomeOS`). We pull it slightly forward so it doesn't "glitch" inside the black screen surface. |

### The "Screen" Complexity
You'll notice looking at `PhoneModel.jsx` that the screen isn't just one texture.

1.  **The Physical Screen (`<meshStandardMaterial color="black">`)**:
    This is the "hardware." It lights up, reflects light, and looks like glass. It is always black.

2.  **The Digital Screen (`<Html transform>`)**:
    This is a magical portal. It takes a regular DOM element (`<div>`) and projects it into the 3D scene.
    *   **Occlusion**: The `occlude` prop tells Three.js "If the phone body is in front of this HTML, hide the HTML." This is how the screen "disappears" when you turn the phone around.
    *   **Scale**: We shrink the HTML down (`scale={0.035}`). This allows us to write normal CSS (pixels) but have it fit on a tiny 3D phone model (meters).

### The "Flip" Challenge (Folding Phones)
The Flip model is harder because it has **Two Sandwiches** connected by a hinge.
*   **Bottom Group**: Fixed. Contains the main chassis and bottom half of screen.
*   **Top Group**: Animated. Contains top chassis, cameras, and top half of screen.
*   **The Fold**: We use `react-spring` to rotate the Top Group around the X-axis.
*   **The Hinge**: A small cylinder hidden between the two groups.
*   **The Difference**: The "layer cake" logic applies to *each half* individually.

### Why Code-Generated? (ExtrudeGeometry)
You might wonder why we don't just download a `.gltf` model.
*   **Crispness**: Code-generated shapes are mathematically perfect. No jagged polygons.
*   **Customization**: You want to change the corner radius? Change one number (`radius={0.22}`). In a 3D model, you'd have to open Blender and remodel it.
*   **Performance**: Loading a 3D file takes network time. This code runs instantly.

### Editing "Layers" Tips
*   **If an image looks "glitchy" (Z-Fighting):** It means two layers are at the exact same Z position. Move one by `0.001`.
*   **If the screen looks "washed out":** The `<Html>` layer might be too far *behind* a transparent glass layer. Move it forward (`Z + 0.01`).
*   **If the phone feels "thick":** Reduce the `depth` in `extrudeSettings`.
