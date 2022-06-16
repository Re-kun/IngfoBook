let book = [];
let key_Storage = "Bookself";

// cek apakah browser mendukung local storage
	if (typeof(localStorage) == undefined) {
		alert("Maaf Browser Anda Tidak Mendukung localStorage");
	}
	
//cek apakah ada data di local storage
	if(localStorage.getItem(key_Storage)){
		book =	JSON.parse(localStorage.getItem(key_Storage))
	}

// inputin data kalau tekan submit 
	let submit = document.querySelector('.button-submit button')
	submit.addEventListener('click', function(){
	
		const judul = document.querySelector('#judul').value;
		const penulis = document.querySelector('#penulis').value;
		const tahun = document.querySelector('#tahun').value;
		const status = document.querySelector('#dibaca').checked;

		const books = inputBook(judul,penulis,tahun,status);

		function inputBook(judul, penulis, tahun, status){
			let wibu = {
				id: new Date(),
				judul,
				penulis,
				tahun,
				status
			}
			book.push(wibu)
			book = JSON.stringify(book)
			localStorage.setItem(key_Storage, book);
		} 
	})

// Menampilkan data 

	if (localStorage.getItem(key_Storage)) {
		let books = []
		books = JSON.parse(localStorage.getItem(key_Storage));

		//tampilin datanya
		for(let i = 0 ; i < books.length; i++ ){

			// buat judul
				let judulE = document.createElement('h1')
				judulE.classList.add('title-book')
				judulE.innerText = books[i].judul;

			// buat deskripsi
				let p = document.createElement('p');
				let deskripsi = 	`Buku ini di terbitkan pada tahun <span class="Tahun">${books[i].tahun}</span> oleh <span class="penulis">${books[i].penulis}</span>`
				p.innerHTML = deskripsi


		// button
			let buttonEdit = document.createElement('button')
			 buttonEdit.classList.add('editt')
			 buttonEdit.innerText = "edit"
			 buttonEdit.setAttribute('onclick', `update(${JSON.stringify(books[i])})`)

			 let buttonHapus = document.createElement('button')
			 buttonHapus.classList.add('hapus')
			 buttonHapus.innerText = "hapus"
		
			 let id = books[i].id;
			 id = JSON.stringify(id)
			 buttonHapus.setAttribute('onclick', `deleted(${id})`)

		// button container 
			let buttonContainer = document.createElement('div')
			buttonContainer.classList.add('book-buttons')
			buttonContainer.append(buttonEdit , buttonHapus)

		// card container
			let li = document.createElement('li')
			li.classList.add('books-item')
			li.append(judulE, p, buttonContainer)

			let belum = document.querySelector('.belum .books-list')
			belum.append(li)

		}

	}else {
		console.log('Maaf Anda tidak punya riwayat baca :v')
	}
	

// hapus data 
	let books = []
	books = JSON.parse(localStorage.getItem(key_Storage));

	function deleted(id){
		let newwid = id
		for(let i = 0 ; i < books.length; i++ ){
				
			if (newwid == books[i].id) {
				books.splice(i,1)
		  }
		}
			books = JSON.stringify(books)
			localStorage.setItem(key_Storage, books);
			location.reload()
	}


// edit data


// fungsi edit
	function update(buku){
		let editContainer = document.querySelector('.editBuku')
		editContainer.style = 'display: flex;'

		// status 
		let status = false
		if (buku.status == true) {
			status = true;
		}

		let judulInput = document.querySelector('.editBuku #judul');
		judulInput.setAttribute('value', buku.judul)	

		let penulisInput = document.querySelector('.editBuku #penulis');
		penulisInput.setAttribute('value', buku.penulis)

		let tahunInput = document.querySelector('.editBuku #tahun');
		tahunInput.setAttribute('value', buku.tahun)	

		let statusInput = document.querySelector('.editBuku #dibaca')
		statusInput.checked = status
		

			// function update
				let submitEdit = document.querySelector('.button-edit')
				submitEdit.addEventListener('click', function(){

				// ambil value
					const judul = document.querySelector('.editBuku #judul').value;
					const penulis = document.querySelector('.editBuku #penulis').value;
					const tahun = document.querySelector('.editBuku #tahun').value;
					const status = document.querySelector('.editBuku #dibaca').checked;
					const id = buku.id

					editBook(id, judul, penulis, tahun,status)

					function editBook(id, judul, penulis, tahun,status){
						let newBooks = {
							id,
							judul,
							penulis,
							tahun,
							status,
						}

						let oldBook = JSON.parse(localStorage.getItem(key_Storage));
					// hapus bukunya
						for(let i = 0 ; i < books.length; i++ ){
							if (id == books[i].id) {
								oldBook.splice(i,1)
							  }
						}

						oldBook.push(newBooks)
						localStorage.setItem(key_Storage, JSON.stringify(oldBook))
						location.reload()
					}
				})
	}



// tombol close
function closed(){

	let close = document.querySelector('.button-close')
	let edit = document.querySelector('.editBuku');
	close.addEventListener('click', function(){
		edit.style = "display: none;"
	})
}


