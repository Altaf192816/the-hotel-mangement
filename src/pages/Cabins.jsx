import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  //todo-->IF data is fetch using useEffect then each time component mount lead to data fething
  // useEffect(function () {
  //   async function fetchCabinData() {
  //     try {
  //       const data = await getCabin();
  //       console.log(data);

  //       if (!data) throw new Error("Not able to fetch data");
  //     } catch (err) {
  //       console.log(err?.message);
  //     }
  //   }
  //   fetchCabinData();
  // }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
         <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
