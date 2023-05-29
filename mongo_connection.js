const mongoose = require('mongoose')

const database_name = 'node_task_database'
const URIconnection = `mongodb://127.0.0.1:27017/${database_name}`

// adicionar data no final!
const task_schema = mongoose.Schema({
    task: {
        description: String,
        status: Boolean
    }
})

const tasks_model = mongoose.model('tasks', task_schema)

function connect_mongodb() {
    return new Promise((resolve, reject) => {
        mongoose.connect(URIconnection)
    })
}

module.exports = {
    connect_mongodb, URIconnection, tasks_model, task_schema
} 