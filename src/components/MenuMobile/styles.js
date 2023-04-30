import styled, { css } from "styled-components";

export const Container = styled.section`
  position: absolute;
  backdrop-filter: blur(3px);
  width: 100%;
  height: 100%;
  inset: 0 0 0 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(2,0,36);
  background: -moz-radial-gradient(circle, rgba(2,0,36,0.4952043805803571) 0%, rgba(9,9,121,0.3663528399641106) 35%, rgba(0,212,255,0.41677300803133754) 100%, rgba(0,212,255,0.5960447167148109) 100%);
  background: -webkit-radial-gradient(circle, rgba(2,0,36,0.4952043805803571) 0%, rgba(9,9,121,0.3663528399641106) 35%, rgba(0,212,255,0.41677300803133754) 100%, rgba(0,212,255,0.5960447167148109) 100%);
  background: radial-gradient(circle, rgba(2,0,36,0.4952043805803571) 0%, rgba(9,9,121,0.3663528399641106) 35%, rgba(0,212,255,0.41677300803133754) 100%, rgba(0,212,255,0.5960447167148109) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024",endColorstr="#00d4ff",GradientType=1);
    
    opacity: 0;
    pointer-events: none;


    transition: .5s;

  > svg {
    color:var(--cor-branca);
    position: absolute;
    top: 1rem;
    right: 1rem;
    transform: rotate(45deg);
    transition: .7s;
    cursor: pointer;
  }

  .nav_mobile-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    transform: scale(0.7);
    transition: .7s;
    padding: 0;
  }
  .nav_mobile-list a{
    color: var( --cor-branca);
  }

  .nav_mobile-list a.active, .nav_mobile-list a:hover {
    color: var(--cor-branca);
    font-weight: 700;
}

  ${({ isVisible }) => isVisible && css`
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0px);

    > svg {
      transform: rotate(0deg);
    }

    .nav_mobile-list {
      transform: scale(1);
    }
  `}
`;