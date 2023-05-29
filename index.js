const express = require('express')
const app = express()

const path = require('path')
const fs = require('fs')

const { tasks_model, task_schema, connect_mongodb } = require('./mongo_connection')
const { log } = require('console')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/tasks', (req, res) => {
    const tasks_description_array = []
    tasks_model.find({})
        .then((data) => {
            data.forEach((taskObject) => {
                tasks_description_array.push(taskObject.task.description)
            })
            res.render("index", { array_data: tasks_description_array })
        })
        .catch((err) => {
            console.log("Ocorreu um erro ao enviar o arquivo!")
        })
})

app.post('/task_post', (req, res) => {
    const task_name = (req.body).task_name
    const document = {
        "task": {
            "description": task_name,
            "status": true
        }
    }
    tasks_model.create(document)
        .then((data) => {
            res.redirect('/tasks')
        })
})

app.post('/task_delete', (req, res) => {

    console.log(req.body)

    tasks_model.deleteOne({ "task.description": req.body.task_value })
        .then(() => {
            res.redirect('/tasks')
        })
        .catch((err) => {
            console.log('Não foi possível deletar os documentos!')
        })
})

app.delete('/tasks_delete', (req, res) => {
    tasks_model.deleteMany({})
        .then(() => {
            res.redirect('/tasks')
        })
        .catch((err) => {
            console.log('Não foi possível deletar os documentos!')
        })
})

app.post('/task_edit', (req, res) => {
    const json_body = req.body
    const oldValue = json_body.taskOldValue
    // const newValue = json_body.taskNewValue
    const newValue = 'esse campo foi editado!'

    tasks_model.findOne({ "task.description": oldValue })
        .then((doc) => {
            console.log(doc);

            if (doc) {
                doc.task.description = newValue;
                doc.save();
            } else {
                console.log("Documento não encontrado!");
            }
        })
        .then(() => {
            console.log("Campo atualizado com sucesso!");
        })
        .catch(() => {
            console.log("Ocorreu um erro ao consultar ou atualizar o documento!");
        });

    res.redirect('/tasks')
})


module.exports = {
    app
}