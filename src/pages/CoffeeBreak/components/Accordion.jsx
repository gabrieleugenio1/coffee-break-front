import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import seta from "./seta.svg";
import styles from "./styles.module.css";
import FormCoffee from "./FormCoffee";
import VisualizarCoffeeBreaks from "../../../components/Tabela/VisualizarCoffeeBreak";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <img className={styles.chevron} src={seta} alt="Seta" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: styles.itemPanel }}
  />
);

export default function App() {
  return (
    <div className={styles.app}>
      <Accordion transition transitionTimeout={200}>
        <AccordionItem header="Criar Coffee Break ou Entrar no Coffee Break" initialEntered>
            <FormCoffee/>
        </AccordionItem>

        <AccordionItem header="Visualizar todos Coffee Break">
            <VisualizarCoffeeBreaks/>
        </AccordionItem>
    
      </Accordion>
    </div>
  );
}
