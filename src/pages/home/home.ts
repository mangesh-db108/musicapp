import { Component } from '@angular/core';
import { NavController, LoadingController,ActionSheetController } from 'ionic-angular';
import { MusicsProvider } from '../../providers/musics/musics';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MusicPlayerPage } from '../music-player/music-player';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public allMusic = [];	
  constructor(private socialSharing:SocialSharing,
  	private actionSheetController:ActionSheetController,
  	 public navCtrl: NavController,private musicProvider:MusicsProvider,
  	 public loadingController:LoadingController) {
  	
  }

	ionViewDidLoad()
	{
		let allMusicLoadingController = this.loadingController.create({
			content:"getting your songs"
		});
		allMusicLoadingController.present();
		this.musicProvider.getMusic()
  		.subscribe((musicList)=>{
  			allMusicLoadingController.dismiss();
  			this.allMusic=musicList
  		});
	}

	shareSong(music)
	{
		let shareSongActionSheetController = this.actionSheetController.create({
			title:"Share song",
			buttons:[
				{	
					text:'Share on FB',
					icon:'logo-facebook',
					handler:()=>{
						this.socialSharing.shareViaFacebook(music.name,music.image,music.music_url)
					}
				},
				{	text:'Twitter',
					icon:'logo-twitter',
					handler:()=>{
						this.socialSharing.shareViaTwitter(music.name,music.image,music.music_url)
					}
				},
				{	text:'Share',
					icon:'share',
					handler:()=>{
						this.socialSharing.share(music.name,"",music.image,music.music_url)
					}
				},
				{	text:'Cancel',
					role:'desctructive'
				}
			]
		});
		shareSongActionSheetController.present();
	}

	 goToMusic(music)
  {
  		this.navCtrl.push(MusicPlayerPage,{music:music});
  }

	

}
