//initializing variables and elements for jet image handleing

let move_speed = 3, grativy = 0.5;
let jet = document.querySelector('.jet');
let img = document.getElementById('jet-1');
let sound_point = new Audio('asstes/sounds/point.mp3');
let sound_die = new Audio('asstes/sounds/die.mp3');


//Getting Element Properties
let jet_props = jet.getBoundingClientRect();


let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {

    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.cloud_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        jet.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let cloud_sprite = document.querySelectorAll('.cloud_sprite');
        cloud_sprite.forEach((element) => {
            let cloud_sprite_props = element.getBoundingClientRect();
            jet_props = jet.getBoundingClientRect();

            if(cloud_sprite_props.right <= 0){
                element.remove();
            }else{
                if(jet_props.left < cloud_sprite_props.left + cloud_sprite_props.width && jet_props.left + jet_props.width > cloud_sprite_props.left && jet_props.top < cloud_sprite_props.top + cloud_sprite_props.height && jet_props.top + jet_props.height > cloud_sprite_props.top){
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                }else{
                    if(cloud_sprite_props.right < jet_props.left && cloud_sprite_props.right + move_speed >= jet_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = cloud_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let jet_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        jet_dy = jet_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'asstes/images/jet.png';
                jet_dy = -7.6;
            }
        });

        if(jet_props.top <= 0 || jet_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        jet.style.top = jet_props.top + jet_dy + 'px';
        jet_props = jet.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let cloud_seperation = 0;

    let cloud_gap = 35;

    function create_cloud(){
        if(game_state != 'Play') return;

        if(cloud_seperation > 115){
            cloud_seperation = 0;

            let cloud_posi = Math.floor(Math.random() * 43) + 8;
            let cloud_sprite_inv = document.createElement('div');
            cloud_sprite_inv.className = 'cloud_sprite';
            cloud_sprite_inv.style.top = cloud_posi - 70 + 'vh';
            cloud_sprite_inv.style.left = '100vw';

            document.body.appendChild(cloud_sprite_inv);
            let cloud_sprite = document.createElement('div');
            cloud_sprite.className = 'cloud_sprite';
            cloud_sprite.style.top = cloud_posi + cloud_gap + 'vh';
            cloud_sprite.style.left = '100vw';
            cloud_sprite.increase_score = '1';

            document.body.appendChild(cloud_sprite);
        }
        cloud_seperation++;
        requestAnimationFrame(create_cloud);
    }
    requestAnimationFrame(create_cloud);
}



