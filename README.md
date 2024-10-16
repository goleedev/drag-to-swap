# Drag to Swap Task

## Deployed URL:

https://drag-to-swap-iota.vercel.app/

## Overview

This project is a Next.js-based web application designed for editing and managing photo books. It features a user-friendly drag-and-drop interface, allowing users to rearrange photos seamlessly within a photo book layout. The system prevents dragging into empty spaces and offers a real-time image preview during the drag process.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Things to Improve](#things-to-improve)

## Features

- **Drag to Swap Interface**: Drag and drop functionality allows users to rearrange photos within their layouts quickly.
- **Intelligent Drag Behavior**: Dragging only occurs when a photo exists, ensuring empty spaces don't trigger a drag event.
- **Image Preview on Drag**: A real-time preview of the image is shown during the drag process for better feedback.

## Folder Structure

```plaintext
components/                       # Main application components
├── __tests__/                    # Test files for components
│   ├── actions.test.js           # Unit test for Actions component
│   ├── pageHeader.test.js        # Unit test for PageHeader component
│   ├── printPage.test.js         # Unit test for PrintPage component
│   └── sortableItem.test.js      # Unit test for SortableItem component
├── actions.js                    # Actions component (handles additional action buttons like archive, etc.)
├── pageHeader.js                 # PageHeader component (displays the title and actions for each page)
├── printPage.js                  # PrintPage component (handles layout for a photo book page)
├── sortableItem.js               # SortableItem component (handles drag-and-drop for individual photos)
├── icons/                        # Reusable icon components
│   ├── ArchiveIcon.js            # Archive icon component
│   ├── MoreIcon.js               # More options icon component
│   └── ImageIcon.js              # Image placeholder icon component
hooks/                            # Custom React hooks for managing logic
├── __tests__/                    # Test files for hooks
│   ├── useDragAndDrop.js         # Unit test for useDragAndDrop hook
│   └── useInitialData.js         # Unit test for useInitialData hook
├── useDragAndDrop.js             # Custom hook for drag-and-drop behavior
└── useInitialData.js             # Custom hook for initializing data from the photo book
pages/                            # Next.js pages directory (handles route-based components)
├── _app.js                       # Custom App component (global setup for pages)
├── _document.js                  # Custom Document component (modifies base HTML structure)
├── index.js                      # Homepage component (main entry point for the app)
└── testpage.js                   # A test page component for development purposes
public/                           # Static assets like images, icons, etc.
styles/                           # Component-specific and global styles
├── actionsStyles.js              # Styles for Actions component
├── global.js                     # Global CSS styles for the entire application
├── pageHeaderStyles.js           # Styles for PageHeader component
├── printPageStyles.js            # Styles for PrintPage component
├── sortableItemStyles.js         # Styles for SortableItem component
└── theme.js                      # Theme settings for consistent styling (e.g., colors, fonts)
utils/                            # Utility functions and helpers
├── __tests__/                    # Unit tests for utility functions
└── dragUtils.js                  # Utility functions for drag-and-drop logic
jest.config.js                    # Jest configuration for setting up the testing environment
jest.setup.js                     # Jest setup file to configure test environment (e.g., global settings)
next.config.js                    # Next.js configuration file for custom project settings
```

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/goleedev/drag-to-swap.git
```

2. Navigate to the project directory:

```bash
   cd drag-to-swap
```

3.  Install dependencies:

```bash
   yarn install
```

## Usage

1. Start the development server:

```bash
   yarn dev
```

2. Open your browser and navigate to:

http://localhost:3000

You should see the application running locally.

## Testing

This project uses **Jest** and **React Testing Library** for unit and integration tests. To run the tests, use the following command:

```bash
   yarn test
```

## Technologies Used

- **Next.js**: Framework for server-side rendering and React-based frontend.
- **React**: The library used for building the user interface.
- **Styled Components**: A CSS-in-JS solution for writing component-level styles.
- **Jest**: A testing framework for JavaScript, used for writing unit and integration tests.
- **React Testing Library**: A library to test React components in a way that resembles user interaction.
- **@dnd-kit/core**: A flexible drag-and-drop toolkit for handling drag-and-drop interactions.

## Things to Improve

- Animations: Adding smooth animations to make the drag-and-drop process more intuitive and visually appealing:
  - Water Drop Animation: When starting to drag an image, a water drop effect can ripple out from the image to indicate that the item is being picked up.
  - Gradual Circular Filling Animation: When the dragged image is dropped into a new spot, the image should fill the new position starting from the center and expanding outward in a circular form.
  - Fade In/Out Swapping Animation: As the image swaps places with another image, the new image should fade into the new spot while the existing image fades out, creating a smooth transition between the two.
