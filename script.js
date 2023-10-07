//initializing variables and elements for jet image handleing

let move_speed = 3, grativy = 0.5;
let jet = document.querySelector('.jet');
let img = document.getElementById('jet-1');
let sound_point = new Audio('asstes/sounds/point.mp3');
let sound_die = new Audio('asstes/sounds/die.mp3');


//Getting Element Properties(Using Jet and Background )
let fly_jet = jet.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();

//selected CSS class and assigns it to the variables
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

//This initializes a variable support to start and play
let game_state = 'Start';
//HTML img elements are hided
img.style.display = 'none';
//Added HTML message class with CSS messageStyle class
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
            let meteor_shower_cycle = element.getBoundingClientRect();
            fly_jet = jet.getBoundingClientRect();

            if(meteor_shower_cycle.right <= 0){
                element.remove();
            }else{
                if(fly_jet.left < meteor_shower_cycle.left + meteor_shower_cycle.width && fly_jet.left + fly_jet.width > meteor_shower_cycle.left && fly_jet.top < meteor_shower_cycle.top + meteor_shower_cycle.height && fly_jet.top + fly_jet.height > meteor_shower_cycle.top){
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                }else{
                    if(meteor_shower_cycle.right < fly_jet.left && meteor_shower_cycle.right + move_speed >= fly_jet.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = meteor_shower_cycle.left - move_speed + 'px';
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

        if(fly_jet.top <= 0 || fly_jet.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        jet.style.top = fly_jet.top + jet_dy + 'px';
        fly_jet = jet.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let meteor_shower_seperation = 0;

    let meteor_shower_gap = 35;

    function create_meteor_shower(){
        if(game_state != 'Play') return;

        if(meteor_shower_seperation > 115){
            meteor_shower_seperation = 0;

            let meteor_shower_cycle = Math.floor(Math.random() * 43) + 8;
            let meteor_shower_inv = document.createElement('div');
            meteor_shower_inv.className = 'meteor_shower';
            meteor_shower_inv.style.top = meteor_shower_cycle - 70 + 'vh';
            meteor_shower_inv.style.left = '100vw';

            document.body.appendChild(meteor_shower_inv);
            let meteor_shower = document.createElement('div');
            meteor_shower.className = 'meteor_shower';
            meteor_shower.style.top = meteor_shower_cycle + meteor_shower_gap + 'vh';
            meteor_shower.style.left = '100vw';
            meteor_shower.increase_score = '1';

            document.body.appendChild(meteor_shower);
        }
        meteor_shower_seperation++;
        requestAnimationFrame(create_meteor_shower);
    }
    requestAnimationFrame(create_meteor_shower);
}



