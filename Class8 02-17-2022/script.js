const url = 'https://json-server-boris.herokuapp.com/api/students';

async function getStudents(url) {
    const studentData = await fetch(url);

    const students = await studentData.json();

    let lessThan18 = students.filter(r => {
        if(r["age"] <= 18){
            return r
        }
    });
    console.log(lessThan18);

    let fullNames = students.map(r => `${r["firstName"]} ${["lastName"]}`);
    console.log(fullNames);

    let cities = students.forEach(r => console.log(r["city"].toUpperCase()));

    let male21 = students.filter(r => {
        if(r["age"] >= 21 && r["gender"] === "Male"){
            return r
        }
    });
    console.log(male21);

    let averageGrade = students.reduce((sum, r) => 
        sum += r["averageGrade"] /students.length, 0);
    console.log(Math.round(averageGrade));

    let twoToEach = students.forEach(r => console.log(r["averageGrade"] + 2));

    console.log(students);

    function twinArray(arr){
        let copy = [];
        arr.forEach(e => copy.push(e));
        return copy;
    };

    let lastName = [...students]       //twinArray(students);
    lastName.sort((stu1, stu2)=>{
        if(stu1.lastName < stu2.lastName) { return -1; }
        if(stu1.lastName > stu2.lastName) { return 1; }
        return 0;
    });
    console.log(lastName);

    let ageSort = twinArray(students);
    ageSort.sort((stu1, stu2) => stu1.age - stu2.age);
    console.log(ageSort);
    

    //Three function with same outcome
    let femaleMale = students.reduce((obj, stu) => {
        let gender = stu["gender"];
        if (!obj[gender]) {             // How (!obj[gender]) {obj[gender] = []}
            obj[gender] = []
          }
          obj[gender].push(stu)
          return obj
    }, {});
    console.log(femaleMale);

    let femaleMale1 = students.reduce((obj, stu) => {
        const gen = (obj[stu.gender] || []);       //How (obj[stu.gender] || [])
        gen.push(stu);
        obj[stu.gender] = gen;
        return obj;
    }, {});
    console.log(femaleMale1);


    let femaleMale2 = students.reduce((obj, stu) => ({
        ...obj,
        [stu.gender]: [...(obj[stu.gender] || []), stu]      //(obj[stu.gender] || [])
      }), {});
    console.log(femaleMale2);
    

}
getStudents(url);