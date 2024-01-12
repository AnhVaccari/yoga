import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {
  allControllersAppModule,
  allModulesApp,
  allProvidersAppModule,
} from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setupDataSource } from './setup';
import { UserService } from '../src/user/user.service';
import { PosesService } from '../src/poses/poses.service';

describe('App (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  beforeAll(async () => {
    const dataSource = await setupDataSource();
    const mockUserService = {
      findOne: jest.fn().mockImplementation(() =>
        Promise.resolve({
          id: 1,
          username: 'Ana',
          password:
            '$2b$10$5B9FB.4Idhk2H1dLI9xeIutY8WATBCuMMPLdMMTyhp/3..hwAW9mW',
          date_joined: new Date(),
        }),
      ),
      getUser: jest.fn().mockImplementation(() =>
        Promise.resolve({
          id: 1,
          username: 'Ana',
          password:
            '$2b$10$5B9FB.4Idhk2H1dLI9xeIutY8WATBCuMMPLdMMTyhp/3..hwAW9mW',
          date_joined: new Date(),
        }),
      ),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as unknown as UserService;

    const mockPosesService = {
      getPoses: jest.fn().mockImplementation(() =>
        Promise.resolve([
          {
            id: 1,
            sanskrit_name: 'Nāvāsana',
            english_name: 'Bateau',
            description:
              'From a seated position the feet are lifted up so that the thighs are angled about 45-50 degrees relative to the earth.  The tailbone is lengthened into the earth and the pubis pulls toward the navel.  The shoulder blades are spread across the back and the hands reach around the back of the calves, with legs pulled towards the body.  The chin is tipped slightly toward the sternum so that the base of the skull lifts lightly away from the back of the neck.  Gaze is forward.',
            benefits:
              'Strengthens the abdomen, hip flexors, and spine.  Stimulates the kidneys, thyroid and prostate glands, and intestines.  Helps relieve stress.  Improves digestion.',
            img_url_svg:
              'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.svg',
            img_url_jpg:
              'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.png',
            img_url_svg_alt:
              'https://www.dropbox.com/s/4m64ztxkj8a4dab/boatstraightlegs.svg?raw=1',
            difficultyId: 1,
          },
          {
            id: 2,
            sanskrit_name: 'Ardha Nāvāsana',
            english_name: 'Demi-bateau',
            description:
              'From a seated position the hands are gripped around the back of the legs and the knees are bent in a 90 degree angle.  Both legs are pulled in towards the abdomen.  The core is engaged to maintain balance on the sits bones (be sure that the back does not round).  The front of the torso lengthens between the pubis and top of the sternum as the spine extends in both directions reaching up to the sky and rooting down to the earth.  The gaze is forward and Bandhas are engaged.',
            benefits:
              'Strengthens the abdomen, hip flexors and spine.  Stimulates the kidneys, thyroid, prostate glands and intestines.  Helps relieve stress.  Improves digestion.',
            img_url_svg:
              'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.svg',
            img_url_jpg:
              'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.png',
            img_url_svg_alt:
              'https://www.dropbox.com/s/1nx0r94msxjwvyp/boatbentlegs.svg?raw=1',
            difficultyId: 1,
          },
          {
            id: 3,
            sanskrit_name: 'Dhanurāsana',
            english_name: 'Arc',
            description:
              'From a prone position with the abdomen on the earth, the hands grip the ankles (but not the tops of the feet) with knees no wider than the width of your hips.  The heels are lifted away from the buttocks and at the same time the thighs are lifted away from the earth working opposing forces as the heart center, hips and back open.  The gaze is forward.',
            benefits:
              'Stretches the entire front of the body, ankles, thighs and groins, abdomen and chest, and throat, and deep hip flexors (psoas).  Strengthens the back muscles.  Improves posture.  Stimulates the organs of the abdomen and neck.',
            img_url_svg:
              'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483072/yoga-api/3_aa0fgk.svg',
            img_url_jpg:
              'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483072/yoga-api/3_aa0fgk.png',
            img_url_svg_alt:
              'https://www.dropbox.com/s/wizj5kwxvez4c0a/bow.svg?raw=1',
            difficultyId: 1,
          },
          {
            id: 4,
            sanskrit_name: 'Setu Bandha Sarvāṅgāsana',
            english_name: 'Pont',
            description:
              'From a supine position, on your back, the hips are pressed up with the heels of the feet rooted into the earth close to the sits bones.  The toes are actively lifted and the pelvis tucked.  The thighs are parallel to the earth and the fingers are interlaced under the body with the ribcage lifted and the heart open.  The back of the neck rests on the earth.  The gaze is to the sky.',
            benefits:
              'Stretches the chest, neck, and spine.  Stimulates abdominal organs, lungs, and thyroids.  Rejuvenates tired legs.  Improves digestion.  Helps relieve the symptoms of menopause.  Relieves menstrual discomfort when done supported.  Reduces anxiety, fatigue, backache, headache, and insomnia.  Therapeutic for asthma, high blood pressure, osteoporosis, and sinusitis.',
            img_url_svg:
              'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/4_qq6nxw.svg',
            img_url_jpg:
              'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/4_qq6nxw.png',
            img_url_svg_alt:
              'https://www.dropbox.com/s/f1w64ybg4sn8ejt/bridge.svg?raw=1',
            difficultyId: 1,
          },
        ]),
      ),
      getPose: jest.fn().mockImplementation(() =>
        Promise.resolve({
          id: 1,
          sanskrit_name: 'Nāvāsana',
          english_name: 'Bateau',
          description:
            'From a seated position the feet are lifted up so that the thighs are angled about 45-50 degrees relative to the earth.  The tailbone is lengthened into the earth and the pubis pulls toward the navel.  The shoulder blades are spread across the back and the hands reach around the back of the calves, with legs pulled towards the body.  The chin is tipped slightly toward the sternum so that the base of the skull lifts lightly away from the back of the neck.  Gaze is forward.',
          benefits:
            'Strengthens the abdomen, hip flexors, and spine.  Stimulates the kidneys, thyroid and prostate glands, and intestines.  Helps relieve stress.  Improves digestion.',
          img_url_svg:
            'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.svg',
          img_url_jpg:
            'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.png',
          img_url_svg_alt:
            'https://www.dropbox.com/s/4m64ztxkj8a4dab/boatstraightlegs.svg?raw=1',
          difficultyId: 1,
        }),
      ),
    } as unknown as PosesService;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
          }),
          dataSourceFactory: async () => dataSource,
        }),
        ...allModulesApp,
      ],
      controllers: [...allControllersAppModule],
      providers: [...allProvidersAppModule],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(PosesService)
      .useValue(mockPosesService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/login (GET)- good', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'Ana', password: 'azerty' })
      .expect(201)
      .then((response) => {
        accessToken = response.body.access_token;
      });
  });

  it('/auth/login (GET) - failed', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'Ana', password: 'wrong password' })
      .expect(401);
  });

  it('/pose (GET)', () => {
    return request(app.getHttpServer())
      .get('/pose')
      .auth(accessToken, { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body.length).toEqual(4);
      });
  });

  it('/pose/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/pose/1')
      .auth(accessToken, { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body.id).toEqual(1);
      });
  });
});
