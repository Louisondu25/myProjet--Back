/**
 * @swagger
 * /background-picture:
 *   post:
 *     summary: Create a background picture
 *     description: Add a new background picture to the system.
 *     tags: [BackgroundPicture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BackgroundPicture'
 *     responses:
 *       201:
 *         description: Background picture created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackgroundPicture'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /background-pictures/many:
 *   post:
 *     summary: Add multiple background pictures
 *     description: Create multiple background pictures with the provided details.
 *     tags: [BackgroundPicture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/BackgroundPicture'
 *     responses:
 *       201:
 *         description: Background pictures created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BackgroundPicture'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /background-pictures:
 *   get:
 *     summary: Get all background pictures
 *     description: Retrieve a list of all background pictures.
 *     tags: [BackgroundPicture]
 *     responses:
 *       200:
 *         description: A list of background pictures.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BackgroundPicture'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /background-picture/{id}:
 *   get:
 *     summary: Get a background picture by ID
 *     description: Retrieve a background picture by its ID.
 *     tags: [BackgroundPicture]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the background picture to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Background picture found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackgroundPicture'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /background-picture/{id}:
 *   put:
 *     summary: Update a background picture
 *     description: Update an existing background picture.
 *     tags: [BackgroundPicture]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the background picture to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BackgroundPicture'
 *     responses:
 *       200:
 *         description: Background picture updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackgroundPicture'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /background-picture/{id}:
 *   delete:
 *     summary: Delete a background picture
 *     description: Remove a background picture from the system.
 *     tags: [BackgroundPicture]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the background picture to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Background picture deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /background-pictures/many:
 *   put:
 *     summary: Update multiple background pictures
 *     description: Update existing background pictures in bulk.
 *     tags: [BackgroundPicture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/BackgroundPicture'
 *     responses:
 *       200:
 *         description: Background pictures updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BackgroundPicture'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /background-pictures/many:
 *   delete:
 *     summary: Delete multiple background pictures
 *     description: Remove multiple background pictures from the system.
 *     tags: [BackgroundPicture]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: Comma-separated list of IDs of background pictures to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Multiple background pictures deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */
