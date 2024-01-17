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
import { SessionService } from '../src/session/session.service';

describe('Pose (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  afterAll(async () => {
    await app.close();
  });

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

    const mockSessionService = {
      getSessions: jest.fn().mockImplementation(() =>
        Promise.resolve([
          {
            id: 1,
            title: 'Yoga du matin ',
            description: 'La salutation au soleil (Surya Namaskar)',
            duration: 15,
            difficulty: {
              id: 1,
              difficulty_level: 'Débutante',
            },
            poses: [
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
              },
              {
                id: 6,
                sanskrit_name: 'Uṣṭrāsana',
                english_name: 'Chameau',
                description:
                  'From a kneeling position the knees are hip width apart and the thighs are perpendicular to the earth.  The inner thighs are narrowed and rotated slightly inward with the buttocks engaged but not hardened.  The tailbone is tucked under but the hips do not puff forward.  The shins and tops of the feet are pressed firmly into the earth.  The ribcage is open, along with the heart center, but the lower front ribs do not protrude sharply towards the sky.  The lower back lifts the ribs away from the pelvis to keep the lower spine as long as possible.  The base of the palms are pressed firmly against the soles (or heels) of the feet and the fingers are pointed toward the toes.  The arms are extended straight and are turned slightly outward at the shoulder joint so the elbow creases face forward without squeezing the shoulder blades together.  The neck is in a relatively neutral position, neither flexed nor extended, or (for the advanced practitioners only) the head drops back.  Be careful not to strain your neck and harden your throat.  The gaze is either towards the sky or towards the earth, depending upon your flexibility.',
                benefits:
                  'Stretches the entire front of the body, the ankles, thighs and groins, abdomen and chest, and throat.  Stretches the deep hip flexors (psoas).  Strengthens back muscles.  Improves posture.  Stimulates the organs of the abdomen and neck.',
                img_url_svg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/6_ri1w0e.svg',
                img_url_jpg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/6_ri1w0e.png',
                img_url_svg_alt:
                  'https://www.dropbox.com/s/o5gr4lngltsdg5r/camel.svg?raw=1',
              },
            ],
          },
          {
            id: 2,
            title: 'Etirer et se renforcer',
            description: 'Combisaison de plusieures poses pour la souplesse',
            duration: 20,
            difficulty: {
              id: 3,
              difficulty_level: 'Difficile',
            },
            poses: [
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
              },
              {
                id: 8,
                sanskrit_name: 'Bitilāsana',
                english_name: 'Vache',
                description:
                  'From  box neutral the ribcage is lifted with a gentle sway in the low back.  The tailbone lifts up into dog tilt.  The eyes are soft and the gaze is to the sky.',
                benefits:
                  'Removes fatigue.  Improves breathing and the circulation of blood to the brain.  Rejuvenates the entire body.',
                img_url_svg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.svg',
                img_url_jpg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.png',
                img_url_svg_alt:
                  'https://www.dropbox.com/s/neau4ceai1rskh6/cow.svg?raw=1',
              },
            ],
          },
        ]),
      ),
      getSession: jest.fn().mockImplementation(() =>
        Promise.resolve({
          id: 1,
          title: 'Yoga du matin ',
          description: 'La salutation au soleil (Surya Namaskar)',
          duration: 15,
          difficulty: {
            id: 1,
            difficulty_level: 'Débutante',
          },
          poses: [
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
            },
            {
              id: 6,
              sanskrit_name: 'Uṣṭrāsana',
              english_name: 'Chameau',
              description:
                'From a kneeling position the knees are hip width apart and the thighs are perpendicular to the earth.  The inner thighs are narrowed and rotated slightly inward with the buttocks engaged but not hardened.  The tailbone is tucked under but the hips do not puff forward.  The shins and tops of the feet are pressed firmly into the earth.  The ribcage is open, along with the heart center, but the lower front ribs do not protrude sharply towards the sky.  The lower back lifts the ribs away from the pelvis to keep the lower spine as long as possible.  The base of the palms are pressed firmly against the soles (or heels) of the feet and the fingers are pointed toward the toes.  The arms are extended straight and are turned slightly outward at the shoulder joint so the elbow creases face forward without squeezing the shoulder blades together.  The neck is in a relatively neutral position, neither flexed nor extended, or (for the advanced practitioners only) the head drops back.  Be careful not to strain your neck and harden your throat.  The gaze is either towards the sky or towards the earth, depending upon your flexibility.',
              benefits:
                'Stretches the entire front of the body, the ankles, thighs and groins, abdomen and chest, and throat.  Stretches the deep hip flexors (psoas).  Strengthens back muscles.  Improves posture.  Stimulates the organs of the abdomen and neck.',
              img_url_svg:
                'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/6_ri1w0e.svg',
              img_url_jpg:
                'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/6_ri1w0e.png',
              img_url_svg_alt:
                'https://www.dropbox.com/s/o5gr4lngltsdg5r/camel.svg?raw=1',
            },
          ],
        }),
      ),
      startSession: jest.fn(),
      stopSession: jest.fn(),
    } as unknown as SessionService;

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
      .overrideProvider(SessionService)
      .useValue(mockSessionService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'Ana', password: 'azerty' })
      .expect(201)
      .then((response) => {
        accessToken = response.body.access_token;
      });
  });

  it('/session (GET)', () => {
    return request(app.getHttpServer())
      .get('/session')
      .auth(accessToken, { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body.length).toEqual(2);
      });
  });

  it('/session/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/session/1')
      .auth(accessToken, { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body.id).toEqual(1);
      });
  });

  it('/session/1/start (POST)', () => {
    return request(app.getHttpServer())
      .post('/session/1/start')
      .auth(accessToken, { type: 'bearer' })
      .expect(201);
  });

  it('/session/1/stop (POST)', () => {
    return request(app.getHttpServer())
      .post('/session/1/stop')
      .auth(accessToken, { type: 'bearer' })
      .expect(201);
  });
});
