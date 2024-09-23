/**
 * @swagger
 * /background-color:
 *   post:
 *     summary: Create a background color
 *     description: Add a new background color to the system.
 *     tags: [BackgroundColor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BackgroundColor'
 *     responses:
 *       201:
 *         description: Background color created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackgroundColor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /background-colors/many:
 *   post:
 *     summary: Add multiple background colors
 *     description: Create multiple background colors with the provided details.
 *     tags: [BackgroundColor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/BackgroundColor'
 *     responses:
 *       201:
 *         description: Background colors created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BackgroundColor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /background-colors:
 *   get:
 *     summary: Get all background colors
 *     description: Retrieve a list of all background colors.
 *     tags: [BackgroundColor]
 *     responses:
 *       200:
 *         description: A list of background colors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BackgroundColor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /background-color/{id}:
 *   get:
 *     summary: Get a background color by ID
 *     description: Retrieve a background color by its ID.
 *     tags: [BackgroundColor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the background color to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Background color found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackgroundColor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /background-color/{id}:
 *   put:
 *     summary: Update a background color
 *     description: Update an existing background color.
 *     tags: [BackgroundColor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the background color to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BackgroundColor'
 *     responses:
 *       200:
 *         description: Background color updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackgroundColor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /background-color/{id}:
 *   delete:
 *     summary: Delete a background color
 *     description: Remove a background color from the system.
 *     tags: [BackgroundColor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the background color to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Background color deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /background-colors/many:
 *   put:
 *     summary: Update multiple background colors
 *     description: Update existing background colors in bulk.
 *     tags: [BackgroundColor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/BackgroundColor'
 *     responses:
 *       200:
 *         description: Background colors updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BackgroundColor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /background-colors/many:
 *   delete:
 *     summary: Delete multiple background colors
 *     description: Remove multiple background colors from the system.
 *     tags: [BackgroundColor]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: Comma-separated list of IDs of background colors to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Multiple background colors deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */
