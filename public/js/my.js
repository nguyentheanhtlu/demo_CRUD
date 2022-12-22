const searchProduct = (value) => {
    axios.get('/admin/products/search', {
        params: {
            keyword: value
        }
    }).then(res => {
        let products = res.data;
        let html = '';

        products.forEach((product, index) => {
            html += '<tr>';
            html += `<td>${index + 1} <input type="checkbox"/> </td>`;
            html += `<td>${product.name}</td>`;
            html += `<td>${product.description}</td>`;
            html += `<td>${product.price}</td>`;
            html += ` <td><img style="width: 150px; height: auto" src = '/uploads/${product.image}'   
                                                 </td>`;
            html += `<td>${product.category.name}</td>`;
            html += `<td> <a href="/admin/products/update/${product._id} "
                                                   class="btn btn-primary">Update</a></td>`
            html += `<td><a onclick="return confirm('Are you sure you want to delete this product?')" href="/admin/products/${product._id}/delete" class="btn btn-danger">Delete</a></td>`;
            html += '</tr>';
        })

        document.getElementById('list-product').innerHTML = html;
    })
}
