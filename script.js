let book = [];
let key_Storage = "Bookself";

// cek apakah browser mendukung local storage
	if (typeof(localStorage) == undefined) {
		alert("Maaf Browser Anda Tidak Mendukung localStorage");
	}
	
// getData 
	function getData(){
		 return JSON.parse(localStorage.getItem(key_Storage));
	} 
// setData
	function setData(data){
		book = JSON.stringify(data)
		localStorage.setItem(key_Storage, book);
	}

//cek apakah ada data di local storage
	if(localStorage.getItem(key_Storage)){
		book =	getData();
	}

// inputin data kalau tekan submit 
	let submit = document.querySelector('.checkbox-submit button')
	submit.addEventListener('click', function(){
	
		const judul = document.querySelector('#judul').value;
		const penulis = document.querySelector('#penulis').value;
		const tahun = document.querySelector('#tahun').value;
		const status = document.querySelector('#dibaca').checked;

		const books = inputBook(judul,penulis,tahun,status);

		function inputBook(title, author, year, isComplete){
			let bookObject = {
				id: new Date(),
				title,
				author,
				year,
				isComplete
			}
			book.push(bookObject)
			setData(book)
		} 
	})

// Menampilkan data 

	if (localStorage.getItem(key_Storage)) {
		let books = []
		books = getData();

		for(let i = 0 ; i < books.length; i++ ){

			// buat judul
				let judulE = document.createElement('h1')
				judulE.classList.add('title-book')
				judulE.innerText = books[i].title;

			// buat deskripsi
				let p = document.createElement('p');
				let deskripsi = 	`Buku ini di tulis oleh <span class="penulis">${books[i].author}</span> pada tahun <span class="tahun">${books[i].year}</span>`
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

			 let buttonStatus = document.createElement('button');
			 buttonStatus.classList.add('buttonStatus')

			 if(books[i].isComplete == true){
			 	buttonStatus.innerText = 'Belum'
			 }else {
			 	buttonStatus.innerText = 'Selesai'
			 }

			 buttonStatus.setAttribute('onclick', `changeStatus(${books[i].isComplete}, ${id})`)


		// button container 
			let buttonContainer = document.createElement('div')
			buttonContainer.classList.add('book-buttons')
			buttonContainer.append(buttonStatus, buttonEdit , buttonHapus)
		
		// article
			let article = document.createElement('article')
			article.append(judulE, p, buttonContainer)

		// card container
			let li = document.createElement('li')
			li.classList.add('books-item')
			li.append(article)

			let belum = document.querySelector('.belum .books-list')
			let sudah = document.querySelector('.sudah .books-list')

			if (books[i].isComplete == true){
				sudah.append(li)
			}else {
				belum.append(li)
			}
		}

	} else { console.log('Maaf Anda tidak punya riwayat baca :v') }
	
// Cari Data 
	const cari = document.querySelector('.searchButton');

	cari.addEventListener('click', function(){

	let data = document.querySelector('.searchInput').value;
		let keyword = data.toLowerCase();
		let items = document.querySelectorAll('.books-item')

		items.forEach((item) => {
			let dataTitle = item.firstChild.firstChild.textContent.toLowerCase()
			if(dataTitle.indexOf(keyword) != -1){
				item.style = 'display: block;'
			}else {
				item.style = 'display: none;'
			}
		});
	});

// Hapus data 
	let books = []
	books = getData()

	function deleted(id){
		let ingfo = confirm('ingin menghapus data buku ini ?')

		if(ingfo) {
			let newwid = id
			for(let i = 0 ; i < books.length; i++ ){
					
				if (newwid == books[i].id) {
					books.splice(i,1)
			  }
			}
				setData(books)
				location.reload()
			}
		}


// Edit data
	function update(buku){
		let editContainer = document.querySelector('.editBukuContainer')
		editContainer.style = 'display: flex;'
		document.querySelector('body').style = "overflow: hidden;"

		let status = false
		if (buku.isComplete == true) {
			status = true;
		}

		let judulInput = document.querySelector('.editBukuContainer #judul');
		judulInput.setAttribute('value', buku.title)	

		let penulisInput = document.querySelector('.editBukuContainer #penulis');
		penulisInput.setAttribute('value', buku.author)

		let tahunInput = document.querySelector('.editBukuContainer #tahun');
		tahunInput.setAttribute('value', buku.year)	

		let statusInput = document.querySelector('.editBukuContainer #dibaca')
		statusInput.checked = status
		

			// function update
				let submitEdit = document.querySelector('.button-edit')
				submitEdit.addEventListener('click', function(){

				// ambil value
					const judul = document.querySelector('.editBukuContainer #judul').value;
					const penulis = document.querySelector('.editBukuContainer #penulis').value;
					const tahun = document.querySelector('.editBukuContainer #tahun').value;
					const status = document.querySelector('.editBukuContainer #dibaca').checked;
					const id = buku.id

					editBook(id, judul, penulis, tahun, status)

					function editBook(id, title, author, year, isComplete){
						console.log(judul)
						let newBooks = {
							id,
							title,
							author,
							year,
							isComplete,
						}

						let oldBook = getData()

					// hapus bukunya
						for(let i = 0 ; i < books.length; i++ ){
							if (id == books[i].id) {
								oldBook.splice(i,1)
							  }
							}

						oldBook.push(newBooks)
						setData(oldBook)
						location.reload()
					}
				})
			}

// ganti rak
function changeStatus(status, id){
	let isComplete = status
	let books = getData()

	if (isComplete) {
		isComplete = false
	}else {
		isComplete = true
	}
	for(let i = 0; i < books.length; i++){
		if(id == books[i].id){
			books[i].isComplete = isComplete
		}
	}
	setData(books)
	location.reload()
} 


// tombol close
	function closed(){

		let close = document.querySelector('.button-close')
		let edit = document.querySelector('.editBukuContainer');

		close.addEventListener('click', function(){
			edit.style = "display: none;"
			document.querySelector('body').style = "overflow: none;"

		})
	}