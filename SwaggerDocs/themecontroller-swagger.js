/**
 * @swagger
 * /theme:
 *   post:
 *     summary: Create a theme
 *     description: Add a new theme to the system.
 *     tags: [Theme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Themes'
 *     responses:
 *       201:
 *         description: Theme created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Themes'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /themes:
 *   post:
 *     summary: Add multiple themes
 *     description: Create multiple themes with the provided details.
 *     tags: [Theme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Themes'
 *     responses:
 *       201:
 *         description: Themes created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Themes'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /themes:
 *   get:
 *     summary: Get all themes
 *     description: Retrieve a list of all themes.
 *     tags: [Theme]
 *     responses:
 *       200:
 *         description: A list of themes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Themes'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /theme/{id}:
 *   get:
 *     summary: Get a theme by ID
 *     description: Retrieve a theme by its ID.
 *     tags: [Theme]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the theme to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Theme found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Themes'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /theme/{id}:
 *   put:
 *     summary: Update a theme
 *     description: Update an existing theme.
 *     tags: [Theme]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the theme to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Themes'
 *     responses:
 *       200:
 *         description: Theme updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Themes'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /theme/{id}:
 *   delete:
 *     summary: Delete a theme
 *     description: Remove a theme from the system.
 *     tags: [Theme]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the theme to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Theme deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /themes:
 *   put:
 *     summary: Update multiple themes
 *     description: Update existing themes in bulk.
 *     tags: [Theme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Themes'
 *     responses:
 *       200:
 *         description: Themes updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Themes'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /themes:
 *   delete:
 *     summary: Delete multiple themes
 *     description: Remove multiple themes from the system.
 *     tags: [Theme]
 *     parameters:
 *       - name: ids
 *         in: query
 *         required: true
 *         description: Comma-separated list of IDs of themes to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Multiple themes deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */
