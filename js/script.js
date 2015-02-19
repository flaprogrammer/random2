$(document).ready(function () {
	controllers();
	generateRandomNumber ();
});

function controllers () {
	$('.js_array_gen button').zclip({
		path:'js/ZeroClipboard.swf',
		copy:function(){return generateArray();}
	});
	$('.js_object_gen button').zclip({
		path:'js/ZeroClipboard.swf',
		copy:function(){return generateObject();}
	});
}

function generateArray () {
	var quantity = parseInt($('.js_array_gen .js_quantity').val());
	var min_val = parseInt($('.js_array_gen .js_min_val').val());
	var max_val = parseInt($('.js_array_gen .js_max_val').val());
	var res_string = '[';

	if(isNaN(quantity)||isNaN(min_val)||isNaN(max_val)) {
		alert('Not a number!');
		return false;
	}
	if(max_val-min_val<0) {
		alert('Max < Min');
		return false;
	}

	for(var i=0; i<quantity; i++) {
		res_string += generateRandomNumber(min_val, max_val);
		if(i!=quantity-1) res_string += ', ';
		else res_string += ']';
	}
	$('.js_array_gen .js_output').val(res_string);
	return res_string;
}

function generateObject () {
	var quantity = parseInt($('.js_object_gen .js_quantity').val());
	var min_val = parseInt($('.js_object_gen .js_min_val').val());
	var max_val = parseInt($('.js_object_gen .js_max_val').val());
	var res_string = '{';

	if(isNaN(quantity)||isNaN(min_val)||isNaN(max_val)) {
		alert('Not a number!');
		return false;
	}

	if(max_val-min_val<0) {
		alert('Max < Min');
		return false;
	}

	for(var i=0; i<quantity; i++) {
		var key = createNextKey(key);
		res_string += key +": "+ generateRandomNumber(min_val, max_val);
		if(i!=quantity-1) res_string += ', ';
		else res_string += '}';
	}

	$('.js_object_gen .js_output').val(res_string);
	return res_string;
}

function generateRandomNumber (min, max) {
	var num = Math.floor(Math.random()*(max-min+1))+min;
	return num;
}

function createNextKey (key) {
	var alphabet = 'abcdefghijklmnopqrstuvwxyz';
	var alpha_array = alphabet.split('');
	if(!key) return alpha_array[0];
	var key_array = key.split('');
	var cur_letter;
	var first_part;
	var last_part;

	var cur_num = 1;

	while(true) {
		cur_letter = key_array[key_array.length-cur_num];
		if(cur_letter==undefined) {
			var new_arr = '';
			for(var i=0; i<key_array.length+1; i++) {
				new_arr += 'a';
			}
			return new_arr;
		}
		first_part = key_array.slice(0, key_array.length-cur_num);
		last_part = key_array.slice(key.length+1-cur_num, key_array.length);

		cur_letter = alphabet[alphabet.indexOf(cur_letter)+1];
		if(cur_letter==undefined) {
			key_array[key_array.length-cur_num] = 'a';
			cur_num++;
		}
		else break;
	}

	return first_part.join('') + cur_letter + last_part.join('');
}