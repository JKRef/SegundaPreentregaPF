const editProductForm = document.getElementById('editProduct');

editProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;

    const data = {
        title : document.getElementById('title').value,
        description : document.getElementById('description').value,
        code : document.getElementById('code').value,
        price : document.getElementById('price').value,
        stock : document.getElementById('stock').value,
        category : document.getElementById('category').value,
        thumbnails : document.getElementById('thumbnails').value
    };

    fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => window.location.href = '/')
});
