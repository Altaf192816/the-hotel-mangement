import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [isFormOpen,setIsFormOpen] = useState(false);
//todo-->IF data is fetch using useEffect then each time comonent mount data is fethced
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
      <p>TEST</p>
    </Row>
    <Row>
      <CabinTable />
      <Button  onClick={()=>setIsFormOpen(is=>!is)} >Add cabin</Button>
      {isFormOpen && <CreateCabinForm />}
    </Row>
    </>
  );
}

export default Cabins;
