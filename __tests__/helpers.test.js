import {
  GENERATE_RANDOM_HORSES,
  SELECT_RANDOM_HORSES,
  CALCULATE_DURATION,
} from '../src/utils/helpers.js';

describe('Utils/Helpers Fonksiyonları', () => {
  //! GENERATE_RANDOM_HORSES fonksiyonunu test ediyoruz
  test('GENERATE_RANDOM_HORSES 20 adet at oluşturuyor ve bu atlar eşsiz özelliklere sahip', () => {
    const horses = GENERATE_RANDOM_HORSES();

    //! 20 adet atın oluşturulduğunu test ediyoruz
    expect(horses).toHaveLength(20);

    //! Her bir atın id, name, color ve condition özelliklerine sahip olduğunu kontrol ediyoruz
    horses.forEach((horse) => {
      expect(horse).toHaveProperty('id');
      expect(horse).toHaveProperty('name');
      expect(horse).toHaveProperty('color');
      expect(horse).toHaveProperty('condition');
    });
  });

  //! SELECT_RANDOM_HORSES fonksiyonunu test ediyoruz
  test('SELECT_RANDOM_HORSES verilen listeden rastgele 10 at seçiyor', () => {
    const mockHorses = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: Math.floor(Math.random() * 100) + 1,
      position: i + 1, //! Position alanını da ekledik
    }));

    const selectedHorses = SELECT_RANDOM_HORSES(mockHorses);

    //! Rastgele seçilen 10 atın olduğunu kontrol ediyoruz
    expect(selectedHorses).toHaveLength(10);

    //! Seçilen atların, orijinal listede bulunduğunu kontrol ediyoruz
    selectedHorses.forEach((horse) => {
      const expectedHorse = mockHorses.find(
        (mockHorse) => mockHorse.id === horse.id
      );

      //! Sadece id, name ve condition özelliklerini kontrol ediyoruz
      expect(expectedHorse).toEqual(
        expect.objectContaining({
          id: horse.id,
          name: horse.name,
          condition: horse.condition,
        })
      );
    });
  });

  //! CALCULATE_DURATION fonksiyonunu test ediyoruz
  test('CALCULATE_DURATION verilen mesafe, hız ve container genişliğine göre doğru süreyi hesaplıyor', () => {
    const distance = 1600; //! Mesafe örneği (metre cinsinden)
    const containerWidth = 1000; //! Container genişliği örneği (pixel cinsinden)
    const speed = 50; //! Hız örneği (metre/saniye)

    const duration = CALCULATE_DURATION(distance, containerWidth, speed);

    //! CALCULATE_DURATION fonksiyonuna göre hesaplanan süreyi kontrol ediyoruz
    const expectedDuration = Math.round((distance / speed) * (containerWidth / 1000));
    expect(duration).toBe(expectedDuration);
  });
});
