import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, Idea } from 'src/app/services/firebase.service';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.page.html',
  styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {

  url:any;

  selectedFile : any;
  test : ["22mm x 33mm x 43mm", "32mm x 12mm x 89mm"];

  idea: Idea = {
    name: '',
    notes: '',
    price: '',
    image: '',
    category: '',
    series: '',
    //size: [{id:""},{text:""}],
    
  };

  constructor(private activatedRoute: ActivatedRoute, private ideaService: FirebaseService,
    private toastCtrl: ToastController, private router: Router, private store:AngularFireStorage) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ideaService.getIdea(id).subscribe(idea => {
        this.idea = idea;
      });
    }
  }

 async addIdea() {
    //this.idea.image = await this.UploadFile(this.idea.id, this.selectedFile)
    //this.idea.size = this.test
    this.ideaService.addIdea(this.idea).then(() => {
      this.router.navigateByUrl('/idea-list');
      this.showToast('Idea added');
    }, err => {
      this.showToast('There was a problem adding your idea :(');
    });
    //this.idea.image = await this.UploadFile(this.idea.id, this.selectedFile)
  }

  deleteIdea() {
    this.ideaService.deleteIdea(this.idea.id).then(() => {
      this.router.navigateByUrl('/idea-list');
      this.showToast('Idea deleted');
    }, err => {
      this.showToast('There was a problem deleting your idea :(');
    });
  }
 
  async updateIdea() {
    this.url = await this.UploadFile(this.idea.id, this.selectedFile)
    if (this.url != null){
      this.idea.image = this.url
      
    }
    this.ideaService.updateIdea(this.idea).then(() => {
      this.router.navigateByUrl('/idea-list');
      this.showToast('Idea updated');
    }, err => {
      this.showToast('There was a problem updating your idea :(');
    });
    //this.idea.image = await this.UploadFile(this.idea.id, this.selectedFile)
  }

  chooseFile(event){
    this.selectedFile = event.target.files
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  async UploadFile (id, file): Promise<any>{
    if(file && file.length){
      try{
      const task = await this.store.ref('products').child(id).put(file[0])
      return this.store.ref(`products/${id}`).getDownloadURL().toPromise();
    } catch (error){
      console.log(error);}
    }
    
  }
 


}