import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  imports: [FirebaseModule],
  providers: [FirebaseService],
})
export class AppModule {
  constructor(private firebaseService: FirebaseService) {}
}
