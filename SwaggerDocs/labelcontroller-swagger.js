/**
 * @swagger
 * /label:
 *   post:
 *     summary: Create a label
 *     description: Add a new label to the system.
 *     tags: [Label]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Label'
 *     responses:
 *       201:
 *         description: Label created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Label'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /labels/many:
 *   post:
 *     summary: Add multiple labels
 *     description: Create multiple labels with the provided details.
 *     tags: [Label]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Label'
 *     responses:
 *       201:
 *         description: Labels created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Label'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /labels:
 *   get:
 *     summary: Get all labels
 *     description: Retrieve a list of all labels.
 *     tags: [Label]
 *     responses:
 *       200:
 *         description: A list of labels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Label'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /label/{id}:
 *   get:
 *     summary: Get a label by ID
 *     description: Retrieve a label by its ID.
 *     tags: [Label]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the label to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Label found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Label'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /label/{id}:
 *   put:
 *     summary: Update a label
 *     description: Update an existing label.
 *     tags: [Label]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the label to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Label'
 *     responses:
 *       200:
 *         description: Label updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Label'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /label/{id}:
 *   delete:
 *     summary: Delete a label
 *     description: Remove a label from the system.
 *     tags: [Label]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the label to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Label deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /labels/many:
 *   put:
 *     summary: Update multiple labels
 *     description: Update existing labels in bulk.
 *     tags: [Label]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Label'
 *     responses:
 *       200:
 *         description: Labels updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Label'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /labels/many:
 *   delete:
 *     summary: Delete multiple labels
 *     description: Remove multiple labels from the system.
 *     tags: [Label]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: Comma-separated list of IDs of labels to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Multiple labels deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */
