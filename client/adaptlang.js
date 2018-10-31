var landPack = [
	{
		type: 'en',
		alert: "** Attention! **\nVideo downloading has been aborted.\nClick ‘Allow' to continue the download.",
		text: "Click 'Allow' to watch the video"
	},
	{
		type: 'ru',
		alert: "** Предупреждение **\nЗагрузка видео прервана.\nНажмите 'Разрешить', чтобы продолжить загрузку.",
		text: "нажмите Разрешить чтобы посмотреть видео"
	},
	{
		type: 'es',
		alert: "** Advertencia **\nCarga de vídeo interrumpida.\nHaga clic en 'Permitir' para continuar cargándolo.",
		text: "Haga clic en 'Permitir' para ver el vídeo"
	},
	{
		type: 'it',
		alert: "** Attenzione **\nCaricamento video interrotto.\nFai clic su 'Consenti' per continuare il download.",
		text: "Fai clic su 'Consenti' per guardare il video"
	}
]

var lang = navigator.language;
console.log("Current Language: " + lang);

var out = {
	type: '',
	alert: '',
	text: ''
}

landPack.forEach(function(item, i, arr){
	if ( lang.search(item.type) != -1 ){
		out.alert = item.alert;
		out.text = item.text;
		out.type = item.type;
	}
})

if ( out.alert == '' ){
	out = landPack[0];
}