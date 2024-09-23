/**
 * @swagger
 * /astuce:
 *   post:
 *     summary: Create a new astuce
 *     description: Adds a new astuce to the system.
 *     tags: [Astuce]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Astuce'
 *     responses:
 *       201:
 *         description: Astuce created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Astuce'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /astuces:
 *   post:
 *     summary: Add multiple astuces
 *     description: Create multiple astuces with the provided details.
 *     tags: [Astuce]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Astuce'
 *     responses:
 *       201:
 *         description: Astuces created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Astuce'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /astuces:
 *   get:
 *     summary: Get all astuces
 *     description: Retrieve a list of all astuces.
 *     tags: [Astuce]
 *     responses:
 *       200:
 *         description: A list of astuces.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Astuce'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /astuce/{id}:
 *   get:
 *     summary: Get an astuce by ID
 *     description: Retrieve an astuce by its ID.
 *     tags: [Astuce]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the astuce to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Astuce found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Astuce'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /astuce/{id}:
 *   put:
 *     summary: Update an astuce
 *     description: Update an existing astuce.
 *     tags: [Astuce]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the astuce to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Astuce'
 *     responses:
 *       200:
 *         description: Astuce updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Astuce'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /astuce/{id}:
 *   delete:
 *     summary: Delete an astuce
 *     description: Remove an astuce from the system.
 *     tags: [Astuce]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the astuce to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Astuce deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /astuces/many:
 *   put:
 *     summary: Update multiple astuces
 *     description: Update existing astuces in bulk.
 *     tags: [Astuce]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Astuce'
 *     responses:
 *       200:
 *         description: Astuces updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Astuce'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /astuces/many:
 *   delete:
 *     summary: Delete multiple astuces
 *     description: Remove multiple astuces from the system.
 *     tags: [Astuce]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: Comma-separated list of IDs of astuces to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Multiple astuces deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */
