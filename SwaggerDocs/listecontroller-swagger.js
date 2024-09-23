/**
 * @swagger
 * /liste:
 *   post:
 *     summary: Create a list
 *     description: Add a new list to the system.
 *     tags: [Liste]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Liste'
 *     responses:
 *       201:
 *         description: List created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Liste'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /listes/many:
 *   post:
 *     summary: Add multiple lists
 *     description: Create multiple lists with the provided details.
 *     tags: [Liste]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Liste'
 *     responses:
 *       201:
 *         description: Lists created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Liste'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /listes:
 *   get:
 *     summary: Get all lists
 *     description: Retrieve a list of all lists.
 *     tags: [Liste]
 *     responses:
 *       200:
 *         description: A list of lists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Liste'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /liste/{id}:
 *   get:
 *     summary: Get a list by ID
 *     description: Retrieve a list by its ID.
 *     tags: [Liste]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the list to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Liste'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /liste/{id}:
 *   put:
 *     summary: Update a list
 *     description: Update an existing list.
 *     tags: [Liste]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the list to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Liste'
 *     responses:
 *       200:
 *         description: List updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Liste'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /liste/{id}:
 *   delete:
 *     summary: Delete a list
 *     description: Remove a list from the system.
 *     tags: [Liste]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the list to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /listes/many:
 *   put:
 *     summary: Update multiple lists
 *     description: Update existing lists in bulk.
 *     tags: [Liste]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Liste'
 *     responses:
 *       200:
 *         description: Lists updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Liste'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /listes/many:
 *   delete:
 *     summary: Delete multiple lists
 *     description: Remove multiple lists from the system.
 *     tags: [Liste]
 *     parameters:
 *       - name: ids
 *         in: query
 *         required: true
 *         description: Comma-separated list of IDs of lists to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Multiple lists deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */
