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
import { SessionCustomService } from '../src/session_custom/session_custom.service';

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

    const mockSessionCustomService = {
      getSessionCustoms: jest.fn().mockImplementation(() =>
        Promise.resolve([
          {
            id: 1,
            title: 'Relaxation',
            description: 'Nouvelle description',
            duration: 20,
            poses: [
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
              {
                id: 7,
                sanskrit_name: 'Marjaryāsana',
                english_name: 'Chat',
                description:
                  'From box neutral shift some weight to the palms.  The wrists, elbows and shoulders are in one line.  The abdomen is pulled in and up with the spine arched in a strong Cobra spine.  The crown of the head is towards the earth and the neck is relaxed.  The gaze is between the arms towards the belly.',
                benefits: 'Relieves the spine and neck. Energizes the body.',
                img_url_svg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.svg',
                img_url_jpg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.png',
                img_url_svg_alt:
                  'https://www.dropbox.com/s/cginnz98of2jpgr/cat.svg?raw=1',
              },
            ],
          },
          {
            id: 6,
            title: 'Déstresser',
            description: 'Description de la nouvelle session.',
            duration: 15,
            poses: [
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
                id: 10,
                sanskrit_name: 'Balāsana',
                english_name: "Posture de l'enfant",
                description:
                  'From a kneeling position, the toes and knees are together with most of the weight of the body resting on the heels of the feet.  The arms are extended back resting alongside the legs.  The forehead rests softly onto the earth.  The gaze is down and inward.',
                benefits:
                  'Gently stretches the hips, thighs, and ankles.  Calms the brain and helps relieve stress and fatigue.  Relieves back and neck pain when done with head and torso supported.',
                img_url_svg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.svg',
                img_url_jpg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.png',
                img_url_svg_alt:
                  'https://www.dropbox.com/s/ini3uwali0q5gxa/child.svg?raw=1',
              },
            ],
          },
          {
            id: 7,
            title: 'Mal de dos',
            description: 'Description de la nouvelle session.',
            duration: 10,
            poses: [
              {
                id: 20,
                sanskrit_name: 'Uttānāsana',
                english_name: 'Forward Bend with Shoulder Opener',
                description:
                  'From a standing position, the body is folded over at the crease of the hip with the spine long.  The neck is relaxed and the crown of the head is towards the earth.  The feet are rooted into the earth.  The toes are actively lifted.  The spine is straight.  The ribcage is lifted.  The chest and the thighs are connected.  The sacrum lifts up toward the sky in dog tilt.  The fingers are interlaced behind the body and the palms are together.  The arms and elbows are straight.  The shoulder blades rotate towards each other as the hands move forward (away from the lower back).  The gaze is down and inward.',
                benefits:
                  'Calms the brain and helps relieve stress and mild depression.  Stimulates the liver and kidneys.  Stretches the hamstrings, calves, and hips.  Strengthens the thighs and knees.  Improves digestion.  Helps relieve the symptoms of menopause.  Reduces fatigue and anxiety.  Relieves headache and insomnia.  Relieves headache and insomnia.  Opens the shoulders.',
                img_url_svg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/20_uogrfq.svg',
                img_url_jpg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/20_uogrfq.png',
                img_url_svg_alt:
                  'https://www.dropbox.com/s/sjqfq99pqpelv4v/forwardfoldshoulderstretch.svg?raw=1',
              },
              {
                id: 30,
                sanskrit_name: 'Paśchimottānāsana',
                english_name: 'Seated Forward Bend',
                description:
                  'From a seated position with the sits bones rooted into the earth the legs extend forward to the degree that the chest and thighs can stay connected.  The fingers wrap around the toes.  The upper torso folds forward at the crease of the hips with the spine long.  The gaze is forward.',
                benefits:
                  'Calms the brain and helps relieve stress and mild depression.  Stretches the spine, shoulders and hamstrings.  Stimulates the liver, kidneys, ovaries and uterus.  Improves digestion.  Helps relieve the symptoms of menopause and menstrual discomfort.  Soothes headache and anxiety.  Reduces fatigue.  Therapeutic for high blood pressure, infertility, insomnia and sinusitis.  Traditional texts say that Paschimottanasana increases appetite, reduces obesity and cures diseases.',
                img_url_svg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/30_gumpl3.svg',
                img_url_jpg:
                  'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/30_gumpl3.png',
                img_url_svg_alt:
                  'https://www.dropbox.com/s/ji0otecqx42by00/seatedforwardfold.svg?raw=1',
              },
            ],
          },
        ]),
      ),
      getSessionCustom: jest.fn().mockImplementation(() =>
        Promise.resolve({
          id: 1,
          title: 'Relaxation',
          description: 'Nouvelle description',
          duration: 20,
          poses: [
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
            {
              id: 7,
              sanskrit_name: 'Marjaryāsana',
              english_name: 'Chat',
              description:
                'From box neutral shift some weight to the palms.  The wrists, elbows and shoulders are in one line.  The abdomen is pulled in and up with the spine arched in a strong Cobra spine.  The crown of the head is towards the earth and the neck is relaxed.  The gaze is between the arms towards the belly.',
              benefits: 'Relieves the spine and neck. Energizes the body.',
              img_url_svg:
                'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.svg',
              img_url_jpg:
                'https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.png',
              img_url_svg_alt:
                'https://www.dropbox.com/s/cginnz98of2jpgr/cat.svg?raw=1',
            },
          ],
        }),
      ),

      create: jest.fn(),
    } as unknown as SessionCustomService;

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
      .overrideProvider(SessionCustomService)
      .useValue(mockSessionCustomService)
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

  it('/session-custom (GET)', () => {
    return request(app.getHttpServer())
      .get('/session-custom')
      .auth(accessToken, { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body.length).toEqual(3);
      });
  });

  it('/session-custom/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/session-custom/1')
      .auth(accessToken, { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body.id).toEqual(1);
      });
  });

  it('/session-custom (POST)', () => {
    return request(app.getHttpServer())
      .post('/session-custom')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Jambes légères',
        description: 'Nouvelle description de la session',
        duration: 30,
      })
      .expect(201)
      .then((response) => {
        expect(response.body.title).toEqual('Jambes légères');
        expect(response.body.description).toEqual(
          'Nouvelle description de la session',
        );
        expect(response.body.duration).toEqual(30);
      });
  });
});
