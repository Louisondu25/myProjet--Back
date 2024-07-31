const mongoose = require("mongoose"); // Importe la bibliothèque Mongoose
const Logger = require('./logger').pino

mongoose.connection.on('connected', () => Logger.info('Connecté a la base de donnée'));
mongoose.connection.on('open', () => Logger.info('Connexion ouverte a la base de donnée'));
mongoose.connection.on('disconnected', () => Logger.error('Deconnecté a la base de donnée'));
mongoose.connection.on('reconnected', () => Logger.info('Reconnexion a la base de donnée'));
mongoose.connection.on('disconnecting', () => Logger.error('Deconnexion a la base de donnée'));
mongoose.connection.on('close', () => Logger.info('Connexion a la base de donnée'));

mongoose.connect(`mongodb://localhost:27017/${process.env.npm_lifecycle_event == 'test' ? 'CDA_SERVER_TRAINING' : 'CDA_SERVER_PRODUCTION'}`)
