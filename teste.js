fetch('http://127.0.0.1:9999/task_post', {
    method: 'post',
    body: JSON.stringify({ "task_name": "testando método pelo arq js" }),
    headers: {
        'Content-Type': 'application/json'
    }}
)