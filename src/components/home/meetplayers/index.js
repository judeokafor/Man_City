import React, { Component } from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import { Tag } from '../../ui/misc';
import Reveal from 'react-reveal/Reveal';
import HomeCards from './Cards';

export default class MeetPlayers extends Component {
   constructor(props) {
      super(props);

      this.state = {
         show: false
      };
   }

   render() {
      return (
         <Reveal
            fraction={0.7}
            onReveal={() => {
               this.setState({
                  show: true
               });
            }}
         >
            <div
               className='home_meetplayers'
               style={{
                  background: `#ffffff url(${Stripes})`
               }}
            >
               <div className='container'>
                  <div className='home_meetplayers_wrapper'>
                     <div className='home_card_wrapper'>
                        <HomeCards show={this.state.show} />
                     </div>
                     <div className='home_text_wrapper'>
                        <Tag
                           bck='#0e1731'
                           size='60px'
                           color='#ffffff'
                           add={{
                              display: 'inline-block',
                              marginBottom: '10px'
                           }}
                        >
                           Meet
                        </Tag>
                     </div>
                     <div className='home_text_wrapper'>
                        <Tag
                           bck='#0e1731'
                           size='60px'
                           color='#ffffff'
                           add={{
                              display: 'inline-block',
                              marginBottom: '10px'
                           }}
                        >
                           The
                        </Tag>
                     </div>
                     <div className='home_text_wrapper'>
                        <Tag
                           bck='#0e1731'
                           size='60px'
                           color='#ffffff'
                           add={{
                              display: 'inline-block',
                              marginBottom: '10px'
                           }}
                        >
                           Players
                        </Tag>
                     </div>
                     <div className='home_text_wrapper'>
                        <Tag
                           bck='#ffffff'
                           size='27px'
                           color='#0e1731'
                           add={{
                              display: 'inline-block',
                              marginBottom: '27px',
                              border: '1px solid #0e1731'
                           }}
                           link={true}
                           linkto='/the_team'
                        >
                           Meet them here
                        </Tag>
                     </div>
                  </div>
               </div>
            </div>
         </Reveal>
      );
   }
}
