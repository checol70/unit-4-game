var player;
var defender;
var fArray = new Array();
var waitArea = $("#waitarea");
var foesRemaining=0;

class Fighter 
{
    constructor(attack, hp, name) 
    {
        this.baseAttackPower = attack;
        this.attackPower = attack;
        this.counterPower = attack +10;
        this.healthPoints = hp;
        this.name = name;
        this.hpRevealer = null;
        this.attackRevealer = null;
        this.myDiv = null;
        fArray.push(this);
        console.log("fighter added: " + this.name)
    }
    attack(enemy) 
    {
        if(this.healthPoints>0)
        {
            console.log("ATACK!!!")
            enemy.damaged(this.attackPower)
            this.attackPower += this.baseAttackPower;
            if (this.attackRevealer != null)
                this.attackRevealer.html("Current Attack <br>" +this.attackPower);
        }
    }
    damaged(int) 
    {
        this.healthPoints -= int;
        if (this.hpRevealer != null)
        {
            this.hpRevealer.html("Current Hp <br>" +this.healthPoints)
        }
        if(player == this && this.healthPoints<= 0)
        {
            lose();
        }

        if (player != this)
        {
            if (this.healthPoints > 0) 
            {
                player.damaged(this.counterPower);

            }
            else if (this.healthPoints <= 0) 
            {
                defender = null;
                $("#defenderarea").empty();
                foesRemaining--;
                console.log("foesRemaining:",foesRemaining)
                if(foesRemaining <= 0)
                {
                    console.log("wonderful")
                    win();
                }
            }
        }
    }
}

function win()
{
    $("#wintext").show();
}

$("#wintext").hide();
$("#losetext").hide();

function lose()
{
    $("#losetext").show();
}

addFighters();
function addFighters() {
    fighterA = new Fighter(10, 100, "Beat Stick");
    fighterB = new Fighter(25, 50, "Bow Chick");
    fighterC = new Fighter(5, 175, "Knight Guy");
    fighterD = new Fighter(20, 75, "Mage Dude");
    setFighterIcons();
    foesRemaining = fArray.length -1;

}

function setFighterIcons() {
    fArray.forEach(function (e, i) {
        //bringing in an image of our fighter
        fighterImage = $("<img>").attr("src", "assets/images/Fighter" + i + ".png");

        //putting up a div to hold everything
        fighterDiv = $("<div>").attr("id", e.name).addClass("text-center")
        fighterDiv.on("click", function () {
            assignPlayer(e)
        })
        e.myDiv = fighterDiv;
        $("#waitarea").append(fighterDiv);
        fighterDiv.addClass("col-3 text-center align-middle");
        fighterImage.height("150px")

        //this area for showing data
        fighterDiv.append(fighterImage);
        fighterDiv.append("<p class='stat'>" + e.name + "</p>");
        e.hpRevealer = $("<p class='stat'>Current Hp <br>" + e.healthPoints + "</p>");
        e.attackRevealer = $("<p class='stat'>Current Attack <br>" + e.attackPower + "</p>");
        fighterDiv.append(e.hpRevealer);
        fighterDiv.append(e.attackRevealer);
    })
}

function assignPlayer(e) {
    console.log("assigning player")
    if (!fArray.includes(player)) {
        player = e;
        $("#playerarea").append(player.myDiv)
        console.log(player)
    }
    else if (!fArray.includes(defender)) {
        defender = e;
        $("#defenderarea").append(defender.myDiv);
    }
    e.myDiv.removeClass("col-3")
}
function attBtnPressed() {
    console.log("attBtnPressed")
    if (defender != null) {
        console.log("player is attacking")
        player.attack(defender)
    }
}
$("#att-btn").on("click", function (e) {
    attBtnPressed()
})
