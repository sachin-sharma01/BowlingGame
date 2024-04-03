import { Component, OnInit } from '@angular/core';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form = {
    first: 0,
    second: 0,
    third:0
  };
  score: Array<number> = [0];
  frames:Array<any> = []
  public counter: number = 0;
  

  ngOnInit() {
  
  }

  onSubmit(): void {
    if (this.counter === 0) {
      this.score.pop();
     }
    this.counter++;
    this.frames.push(JSON.parse(JSON.stringify(this.form)));
    let inpObj = {
      frames:this.frames
    }
    this.score.push(this.calculateScore(inpObj));
    this.form = {
      first: 0,
      second: 0,
      third:0
    }
  }

  calculateScore(args:any) {
    let totalScore = 0;
    let dummyScore = {
      first: 0,
      second: 0,
      status: "Open",
      bonus: 0
    };
    let frames = [dummyScore, ...args.frames];
    for (let i = 1; i <= frames.length - 1; i++) {
      if (i < 9) {
        if ( (frames[i].first === 10) || (frames[i].first + frames[i].second === 10)) {
          frames[i].score = frames[i].first + frames[i].second;
          frames[i].bonus = 10;
          totalScore = totalScore + frames[i].score + frames[i - 1].bonus;
        } 
        else {
          frames[i].score = frames[i].first + frames[i].second;
          frames[i].bonus = 0;
          totalScore = totalScore + frames[i].score + frames[i - 1].bonus;
        }
      } else {
        if ((frames[i].first === 10) || (frames[i].first + frames[i].second === 10)) {
          
          frames[i].score = frames[i].first + frames[i].second + frames[i].third;
          console.log("should work")
          frames[i].bonus = 10;
          totalScore = totalScore + frames[i].score + frames[i - 1].bonus;
        } 
        else {
          frames[i].score = frames[i].first + frames[i].second;
          frames[i].bonus = 0;
          totalScore = totalScore + frames[i].score + frames[i - 1].bonus;
        }
     }
    }
    return totalScore;
  }
}
