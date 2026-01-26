/**
 * Blog Posts Data
 * ================
 * To add a new post:
 * 1. Create a new file in ./posts/ folder (e.g. my-new-post.ts)
 * 2. Export default a BlogPost object
 * 3. Import it below and add to the posts array
 *
 * Posts are automatically sorted by date (newest first) on the blog page.
 */

// Import all blog posts
import ginseng from "./posts/ginseng";
import howToUseGinseng from "./posts/howToUseGinseng";

// Add all posts to this array
export const posts = [
  ginseng,
  howToUseGinseng,
  // Add new posts here...
];
