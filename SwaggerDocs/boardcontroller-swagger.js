/**
 * @swagger
 * /board:
 *   post:
 *     summary: Create a board
 *     description: Add a new board to the system.
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       201:
 *         description: Board created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /boards/many:
 *   post:
 *     summary: Add multiple boards
 *     description: Create multiple boards with the provided details.
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Board'
 *     responses:
 *       201:
 *         description: Boards created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 */

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 *     description: Retrieve a list of all boards.
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: A list of boards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /board/{id}:
 *   get:
 *     summary: Get a board by ID
 *     description: Retrieve a board by its ID.
 *     tags: [Board]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the board to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Board found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /board/{id}:
 *   put:
 *     summary: Update a board
 *     description: Update an existing board.
 *     tags: [Board]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the board to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       200:
 *         description: Board updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /board/{id}:
 *   delete:
 *     summary: Delete a board
 *     description: Remove a board from the system.
 *     tags: [Board]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the board to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Board deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /boards/many:
 *   put:
 *     summary: Update multiple boards
 *     description: Update existing boards in bulk.
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Board'
 *     responses:
 *       200:
 *         description: Boards updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       405:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /boards/many:
 *   delete:
 *     summary: Delete multiple boards
 *     description: Remove multiple boards from the system.
 *     tags: [Board]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: Comma-separated list of IDs of boards to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Multiple boards deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Internal server error.
 */
