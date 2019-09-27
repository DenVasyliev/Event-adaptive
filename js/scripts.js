$(document).ready(function(){
	'use strick'

	$('.slider').slick({
		dots     : false,
		arrows   : false,
		autoplay : true,
		fade     : true
	});

	let toDate = new Date('2019-09-07 17:26:00'); //when event
		
	let countdown = setInterval(function() {

		// Начало
		//2.Получить разницу (дельту) во времени между сейчас и событием
		let	now    = new Date(),                       //now
			delta  = parseInt((toDate - now) / 1000);            //дельта в секундах

		if (delta <= 0) {
			clearInterval(countdown);
		} else {

			// 3. Cколько целых дней в дельте и вывести в квадрат дней
			let days = Math.floor(delta / (24 * 60 *60));
			$('#days').text(days.toString().length == 1 ? '0' + days : days);
			// 3а. вычесть дни из дельты	
			delta -= days * (24 * 60 * 60);
			// 4. Сколько целых часов в дельте и вывести в квадрат минут
			let hours = Math.floor(delta / (60 *60));
			$('#hours').text(hours.toString().length == 1 ? '0' + hours : hours);
			// 4а вычесть часы из дельты
			delta -= hours * (60 *60);
			// 5. Сколько минут в дельте и вывести в квадрат минут
			let minutes = Math.floor(delta / 60);
			$('#minutes').text(minutes.toString().length == 1 ? '0' + minutes : minutes);
			// 5а. Вычесть минуты из дельты
			delta -= minutes * 60;
			// 6. Сколько секунд в дельте и вывести в квадрат секунд
			let seconds = delta;
			$('#seconds').text(seconds.toString().length == 1 ? '0' + seconds : seconds);

		}	
		// console.log(days + ':' + hours + ':' + minutes + ':' + seconds);
		// конец
	}, 1000);	

	// 7.Проделать действия 2-6 каждую секунду

	let options = [
		{
			endpoint : 'https://reqres.in/api/users',
			count    : 6,
			target   : 'competitorsUsers',
			class    : '',
		},
		{
			endpoint : 'https://reqres.in/api/users?page=2',
			count    : 3,
			target   : 'juryUsers',
			class    : 'user__img-box--round',
		}

	];
	options.forEach(function(option){
		loadUsers(option);
	})

	function loadUsers(opt) {

		let xhr = new XMLHttpRequest();

		xhr.open('GET', opt.endpoint);
		xhr.send();

		xhr.responseType = 'json';

		xhr.onerror = function() {
			alert("Запрос не удался");
		};

		xhr.onload = function() {
			if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
			    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
			} else { // если всё произошлашло гладко, выводим результат
				// console.Log(xhr.response);
				// console.Log(xhr.response.data);
			
				let target = document.getElementById(opt.target),
					users  = xhr.response.data.splice(0, opt.count);	

				users.forEach(function(user){
					// console.log(user.first_name,user.last_name);
					
					let html = ` 
						<div class="user">
							<div class="user__img-box ${opt.class}">
								<img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" class="user__img">
							</div>
							<div class="user__name">${user.first_name} ${user.last_name}</div>
							<div class="user__pos">${user.email}</div>
						</div>`;


					target.innerHTML = target.innerHTML + html;

				});
			}
		};
	};

	// function loadJury(){
	// 	let xhr = new XMLHttpRequest();

	// 	xhr.open('GET', 'https://reqres.in/api/users?page=2');
	// 	xhr.send();

	// 	xhr.responseType = 'json';

	// 	xhr.onerror = function() {
	// 		alert("Запрос не удался");
	// 	};

	// 	xhr.onload = function() {
	// 		if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
	// 		    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
	// 		} else { // если всё произошлашло гладко, выводим результат
		
			
	// 			let target = document.getElementById('juryUsers');	
	// 			let users  = xhr.response.data.splice(0, 3);

	// 			users.forEach(function(user){
	// 				console.log(user.first_name,user.last_name);
					
				
	// 				let html = ` 
	// 					<div class="user">
	// 						<div class="user__img-box user__img-box--round">
	// 							<img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" class="user__img">
	// 						</div>
	// 						<div class="user__name">${user.first_name} ${user.last_name}</div>
	// 						<div class="user__pos">${user.email}</div>
	// 					</div>`;


	// 				target.innerHTML = target.innerHTML + html;
					

	// 			});
	// 		}
	// 	};

	// 	console.log(xhr);
	// };

	let sound = document.querySelector('audio');



	$('.toggler').on('click', function(e){
		e.preventDefault();

		$('body').toggleClass('menu-opened');
		sound.play()
	})
});













