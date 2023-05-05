import styles from './faq-accordion.module.css';

import * as React from 'react';
import { styled } from '@mui/material/styles';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import { Accordion } from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


// const items = [
//   {
//      title: "Как пройти регистрацию на сайте?",
//      content: "This is the content of section 1"
//   },
//   {
//      title: "Как завершить регистрацию и проверить профиль?",
//      content: "This is the content of section 2"
//   },
//   {
//      title: "Какие ограничения на сайте имеют физические лица?",
//      content: "This is the content of section 3"
//   }
// ]

export function FaqAccordion (props) {



  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (index) => {
     setActiveIndex(index === activeIndex ? -1 : index);
  };
  return (
    <div className={styles.ac_wrapper}>
    {props.items.map((item, index) => (
       <div key={item.title} className={styles.item_wrapper}>
          <button  className={`faq__head ${index === activeIndex ? 'active' : ''}`} onClick={() =>handleClick(index)}>{item.title}</button>
          {index === activeIndex &&     item.content.map((el) => {
            return <p className={styles.text}>{el}</p>
          })      }
       </div>
    ))}
 </div>
  
  )
}


// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={"kk"}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
// 'transparent',
//   flexDirection: 'row-reverse',
//   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//     transform: 'rotate(90deg)',
//   },
//   '& .MuiAccordionSummary-content': {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: '1px solid rgba(0, 0, 0, .125)',
// }));

// export function FaqAccordion() {
//   const [expanded, setExpanded] = React.useState('panel1');

//   const handleChange = (panel) => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };

//   return (
//     <div>
//       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//         <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
//           <Typography>Collapsible Group Item #1</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
//             sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
//         <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
//           <Typography>Collapsible Group Item #2</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
//             sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//         <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
//           <Typography>Collapsible Group Item #3</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
//             sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// }


export default FaqAccordion;