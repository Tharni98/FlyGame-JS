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
        document.querySelectorAll('.meteor_shower ').forEach((e) => {
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

        let meteor_shower  = document.querySelectorAll('.meteor_shower ');
        meteor_shower .forEach((element) => {
            let meteor_shower_props = element.getBoundingClientRect();
            jet_props = jet.getBoundingClientRect();

            if(meteor_shower_props.right <= 0){
                element.remove();
            }else{
                if(jet_props.left < meteor_shower_props.left + meteor_shower_props.width && jet_props.left + jet_props.width > meteor_shower_props.left && jet_props.top < meteor_shower_props.top + meteor_shower_props.height && jet_props.top + jet_props.height > meteor_shower_props.top){
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                }else{
                    if(meteor_shower_props.right < jet_props.left && meteor_shower_props.right + move_speed >= jet_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = meteor_shower_props.left - move_speed + 'px';
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

    let meteor_shower_seperation = 0;

    let meteor_shower_gap = 35;

    function create_meteor_shower(){
        if(game_state != 'Play') return;

        if(meteor_shower_seperation > 115){
            meteor_shower_seperation = 0;

            let meteor_shower_posi = Math.floor(Math.random() * 43) + 8;
            let meteor_shower_inv = document.createElement('div');
            meteor_shower_inv.className = 'meteor_shower';
            meteor_shower_inv.style.top = meteor_shower_posi - 70 + 'vh';
            meteor_shower_inv.style.left = '100vw';

            document.body.appendChild(meteor_shower_inv);
            let meteor_shower = document.createElement('div');
            meteor_shower.className = 'meteor_shower';
            meteor_shower.style.top = meteor_shower_posi + meteor_shower_gap + 'vh';
            meteor_shower.style.left = '100vw';
            meteor_shower.increase_score = '1';

            document.body.appendChild(meteor_shower);
        }
        meteor_shower_seperation++;
        requestAnimationFrame(create_meteor_shower);
    }
    requestAnimationFrame(create_meteor_shower);
}



